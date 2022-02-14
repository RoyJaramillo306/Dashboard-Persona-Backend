const Persona = require("../models/persona");
const { validationResult } = require('express-validator');
const { Op } = require('sequelize');

exports.obtenerPersonas = async (req, res) => {
    
    try {
        const personas = await Persona.findAll({ attributes: { exclude: ['createdAt', 'updatedAt'] }, where: { id: { [Op.ne]: req.usuario.id } } });
        res.json(personas);
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }

}

exports.crearPersona = async (req, res) => {

    const errors = validationResult(req);

    if( !errors.isEmpty() ) return res.status(400).json({ errors: errors.array() });

    const { email } = req.body;

    try {

        let persona = await Persona.findOne({ where: { email: email } });
        
        if (persona) return res.status(400).json({ msg: `El email ${email} ya está registrado, pruebe con otro` });

        persona = new Persona(req.body);

        //persona.creador = req.usuario.id;

        persona = await persona.save();

        res.json(persona);

    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');    
    }

}

exports.actualizarPersona = async (req, res) => {

    const errors = validationResult(req);

    if( !errors.isEmpty() ) return res.status(400).json({ errors: errors.array() });

    const { email, emailActual } = req.body;

    try {

        let persona = await Persona.findOne({ where: { email: email } });
        
        if(persona){
            if (persona.email === emailActual){
                console.log('Todo bien');
            } else {
                return res.status(400).json({ msg: `El email ${email} ya está registrado, pruebe con otro` });
            }
        }

        let datos = req.body;

        delete datos.emailActual;
        
        persona = await Persona.findByPk(req.params.id);

        if(persona === null) return res.status(404).json({ msg: 'Persona no encontrada :(' });

        await persona.update( datos, { where: { id: req.params.id } } );

        res.json(persona);

    } catch (error) {
        res.status(500).send('Error en el servidor');
    }

}

exports.eliminarPersona = async (req, res) => {

    try {

        const persona = await Persona.findByPk(req.params.id);

        if(persona === null) return res.status(404).json({ msg: 'Persona no encontrada :(' });

        await persona.destroy({ where: { id: req.params.id } });
        res.json({ msg: 'Persona eliminada exitosamente!' });
        
    } catch (error) {
        res.status(500).send('Error en el servidor');
    }

}