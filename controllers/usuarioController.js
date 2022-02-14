const Usuario = require("../models/usuario");
const bcryptjs = require('bcryptjs');
const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');

exports.obtenerUsuarios = async (req, res) => {
    
    try {
        const usuario = await Usuario.findAll();
        res.json(usuario);
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }

}

exports.crearUsuario = async (req, res) => {

    const errors = validationResult(req);

    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    const { email, password } = req.body;

    try {

        let usuario = await Usuario.findOne({ where: { email: email } });
        
        if (usuario) return res.status(400).json({ msg: 'El usuario ya existe!' });

        usuario = new Usuario(req.body);
        
        const salt = await bcryptjs.genSalt(10);
        usuario.password = await bcryptjs.hash(password, salt);

        await usuario.save();

        jwt.sign({ usuario: usuario }, process.env.SECRETA, {
            expiresIn: 3600
        }, (error, token) => {
            if(error) throw error;
            res.json({ token, usuario });
        });
    
    } catch (error) {
        console.log(error);
        res.status(400).send('Hubo un error');
    }

}

exports.actualizarUsuario = async (req, res) => {

    const errors = validationResult(req);

    if( !errors.isEmpty() ) return res.status(400).json({ errors: errors.array() });

    try {

        const datos = req.body;
        
        let usuario = await Usuario.findByPk(req.params.id);
        console
        if(usuario === null) return res.status(404).json({ msg: 'Usuario no encontrado :(' });

        await usuario.update( datos, { where: { id: req.params.id } } );

        res.json(usuario);

    } catch (error) {
        res.status(500).send(error);
    }

}

exports.eliminarUsuario = async (req, res) => {

    try {

        const usuario = await Usuario.findByPk(req.params.id);

        if(usuario === null) return res.status(404).json({ msg: 'Usuario no encontrado :(' });

        await usuario.destroy({ where: { id: req.params.id } });
        res.json({ msg: 'Usuario eliminado exitosamente!' });
        
    } catch (error) {
        res.status(500).send('Error en el servidor');
    }

}