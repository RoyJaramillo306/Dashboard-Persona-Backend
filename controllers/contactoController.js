const Contacto = require("../models/contacto");
const { validationResult } = require('express-validator');

exports.obtenerContacto = async (req, res) => {
    
    try {
        let contacto = await Contacto.findAll({ where: { persona_id: req.params.id } });
        res.json(contacto);
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }

}

exports.crearContacto = async (req, res) => {

    const errors = validationResult(req);

    if( !errors.isEmpty() ) return res.status(400).json({ errors: errors.array() });

    const { email } = req.body;

    try {

        let contacto = await Contacto.findOne({ where: { email: email } });
        
        if (contacto) return res.status(400).json({ msg: `El email ${email} ya está registrado, pruebe con otro` });

        contacto = new Contacto(req.body);

        //persona.creador = req.usuario.id;

        contacto = await contacto.save();

        res.json(contacto);

    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');    
    }

}

exports.actualizarContacto = async (req, res) => {

    const errors = validationResult(req);

    if( !errors.isEmpty() ) return res.status(400).json({ errors: errors.array() });

    try {

        const datos = req.body;
        
        let contacto = await Contacto.findByPk(req.params.id);

        if(contacto === null) return res.status(404).json({ msg: 'Contacto no encontrado :(' });

        await contacto.update( datos, { where: { id: req.params.id } } );

        res.json(contacto);

    } catch (error) {
        res.status(500).send('Error en el servidor');
    }

}

exports.eliminarContacto = async (req, res) => {

    try {

        const contacto = await Contacto.findByPk(req.params.id);

        if(contacto === null) return res.status(404).json({ msg: 'Contacto no encontrado :(' });

        await contacto.destroy({ where: { id: req.params.id } });
        res.json({ msg: 'Contacto eliminado exitosamente!' });
        
    } catch (error) {
        res.status(500).send('Error en el servidor');
    }

}