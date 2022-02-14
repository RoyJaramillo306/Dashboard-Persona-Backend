const express = require('express');
const router = express.Router();
const personaController = require('../controllers/personaController');
const auth = require('../middleware/auth');
const { check } = require('express-validator');

router.get('/',
    auth,
    personaController.obtenerPersonas
);

router.post('/', 
    //auth,
    [
        check('nombre', 'El nombre es obligatorio').not().isEmpty(),
        check('apellido', 'El apellido es obligatorio').not().isEmpty(),
        check('email', 'El email es obligatorio').not().isEmpty(),
        check('email', 'Agrega un email válido').isEmail(),
        check('ciudad', 'La ciudad es obligatoria').not().isEmpty(),
        check('pais', 'El país es obligatorio').not().isEmpty(),
        check('telefono', 'El telefono solo puede contener números').isNumeric(),
        check('direccion', 'La dirección es obligatorio').not().isEmpty()
    ],      
    personaController.crearPersona
);

router.put('/:id', 
    auth,
    [
        check('nombre', 'El nombre es obligatorio').not().isEmpty(),
        check('apellido', 'El apellido es obligatorio').not().isEmpty(),
        check('email', 'El email es obligatorio').not().isEmpty(),
        check('email', 'Agrega un email válido').isEmail(),
        check('ciudad', 'La ciudad es obligatoria').not().isEmpty(),
        check('pais', 'El país es obligatorio').not().isEmpty(),
        check('telefono', 'El telefono solo puede contener números').isNumeric(),
        check('direccion', 'La dirección es obligatorio').not().isEmpty()
    ],      
    personaController.actualizarPersona
);

router.delete('/:id',
    auth,
    personaController.eliminarPersona
);

module.exports = router;