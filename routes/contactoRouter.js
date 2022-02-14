const express = require('express');
const router = express.Router();
const contactoController = require('../controllers/contactoController');
const auth = require('../middleware/auth');
const { check } = require('express-validator');

router.get('/:persona_id',
    auth,
    contactoController.obtenerContacto
);

router.post('/', 
    auth,
    [
        check('nombre', 'El nombre es obligatorio').not().isEmpty(),
        check('email', 'El email es obligatorio').not().isEmpty(),
        check('email', 'Agrega un email válido').isEmail(),
        check('telefono', 'El telefono solo puede contener números').isNumeric()
    ],      
    contactoController.crearContacto
);

router.put('/:id', 
    auth,
    [
        check('nombre', 'El nombre es obligatorio').not().isEmpty(),
        check('email', 'El email es obligatorio').not().isEmpty(),
        check('email', 'Agrega un email válido').isEmail(),
        check('telefono', 'El telefono solo puede contener números').isNumeric()
    ],      
    contactoController.actualizarContacto
);

router.delete('/:id',
    auth,
    contactoController.eliminarContacto
);

module.exports = router;