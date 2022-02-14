const express = require('express');
const router = express.Router();
const casoController  = require('../controllers/casoController');
const auth = require('../middleware/auth');
const { check } = require('express-validator');

router.get('/',
    auth,
    casoController.obtenerCasos
);

router.post('/', 
    auth,
    [
        check('tipo', 'El tipo del caso es obligatorio').not().isEmpty(),
        check('fecha', 'La fecha es obligatoria').not().isEmpty(),
        check('monto', 'El monto es obligatorio').not().isEmpty(),
        check('monto', 'El monto debe ser un número').isNumeric(),
        check('descripcion', 'La descipción del caso es obligatoria').not().isEmpty(),
        check('estado', 'El estado del caso es obligatorio').not().isEmpty(),
        check('cliente_id', 'El cliente del caso es obligatorio').not().isEmpty(),
        check('encargado_id', 'El encargado del caso es obligatorio').not().isEmpty()
    ],      
    casoController.crearCaso
);

router.put('/:id', 
    auth,
    [
        check('tipo', 'El tipo del caso es obligatorio').not().isEmpty(),
        check('fecha', 'La fecha es obligatoria').not().isEmpty(),
        check('monto', 'El monto es obligatorio').not().isEmpty(),
        check('monto', 'El monto debe ser un número').isNumeric(),
        check('descripcion', 'La descipción del caso es obligatoria').not().isEmpty(),
        check('estado', 'El estado del caso es obligatorio').not().isEmpty(),
        check('cliente_id', 'El cliente del caso es obligatorio').not().isEmpty(),
        check('encargado_id', 'El encargado del caso es obligatorio').not().isEmpty()
    ],      
    casoController.actualizarCaso
);

router.delete('/:id',
    auth,
    casoController.eliminarCaso
);

module.exports = router;