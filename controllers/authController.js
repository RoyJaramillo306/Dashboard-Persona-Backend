const Usuario = require("../models/Usuario");
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Persona = require("../models/persona");

exports.iniciarSesion = async (req, res) => {

    const { email, password } = req.body;

    try {
        
        let usuario = await Usuario.findOne({ where: { email: email } });

        if (!usuario) return res.status(400).json({ msg: 'El usuario no existe' }); 

        const pass = await bcryptjs.compare(password, usuario.password);

        if(!pass) return res.status(400).json({ msg: 'Password incorrecto' });

        const payload = {
            usuario: {
                id: usuario.id
            }
        };

        jwt.sign(payload, process.env.SECRETA, {
            expiresIn: 3600
        }, (error, token) => {
            if(error) throw error;
            res.json({ token, msg: 'Inicio de sesión exitosa!' });
        });

    } catch (error) {
        res.status(400).send(error);
    }

}

exports.usuarioAutenticado = async (req, res) => {
    
    try {
        
        const usuario = await Usuario.findByPk(req.usuario.id, { attributes: ['id', 'perfil', 'estado', 'email'] });
        const { email } = usuario;

        let persona = await Persona.findOne({ where: { email: email } });
        const { nombre, apellido } = persona;
        const fullName = nombre + ' ' + apellido;

        res.json({usuario, fullName});

    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }

}