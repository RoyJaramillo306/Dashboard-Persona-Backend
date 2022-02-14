const Caso = require("../models/caso");
const Persona = require("../models/persona");
const { validationResult } = require('express-validator');

exports.obtenerCasos = async (req, res) => {
    
    try {
        const casos = await Caso.findAll({
            include: [
                {
                    model: Persona,
                    as: "cliente",
                    attributes: ['id', 'nombre']
                },
                {
                    model: Persona,
                    as: "abogado",
                    attributes: ['id', 'nombre', 'email']
                }
            ],
            attributes: ['id', 'tipo', 'fecha', 'monto', 'descripcion', 'estado']
        });
        res.json(casos);
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }

}

exports.crearCaso = async (req, res) => {

    const errors = validationResult(req);

    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    try {

        const caso = new Caso(req.body);

        await caso.save();
        res.json(caso);
    
    } catch (error) {
        console.log(error);
        res.status(400).send('Hubo un error');
    }

}

exports.actualizarCaso = async (req, res) => {

    const errors = validationResult(req);

    if( !errors.isEmpty() ) return res.status(400).json({ errors: errors.array() });

    try {

        const datos = req.body;
        
        let caso = await Caso.findByPk(req.params.id);

        if(caso === null) return res.status(404).json({ msg: 'Caso no encontrado :(' });

        await caso.update( datos, { where: { id: req.params.id } } );

        res.json(caso);

    } catch (error) {
        res.status(500).send('Error en el servidor');
    }

}

exports.eliminarCaso = async (req, res) => {

    try {

        const caso = await Caso.findByPk(req.params.id);

        if(caso === null) return res.status(404).json({ msg: 'Caso no encontrado :(' });

        await caso.destroy({ where: { id: req.params.id } });
        res.json({ msg: 'Caso eliminado exitosamente!' });
        
    } catch (error) {
        res.status(500).send('Error en el servidor');
    }

}