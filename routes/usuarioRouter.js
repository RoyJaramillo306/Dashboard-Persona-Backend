const express = require('express');
const router = express.Router();
const usuarioController  = require('../controllers/usuarioController');
const { check } = require('express-validator');
const auth = require('../middleware/auth');

router.get('/',
    auth,
    usuarioController.obtenerUsuarios
);

router.post('/',
    [
        check('perfil', 'El perfil es obligatorio').not().isEmpty(),
        check('perfil', 'El perfil solo puede contener letras').isNumeric(),
        check('password', 'El password es obligatorio').not().isEmpty(),
        check('password', 'El password no debe tener caracteres especiales, solo letras y números').isAlphanumeric(),
        check('password', 'El password debe tener mínimo 6 caracteres').isLength({ min: 6 })
    ], 
    usuarioController.crearUsuario
);

router.put('/:id', 
    auth,
    [
        check('perfil', 'El perfil es obligatorio').not().isEmpty(),
        check('perfil', 'El perfil solo puede contener letras').isAlpha(),
        check('estado', 'El estado es obligatorio').not().isEmpty(),
        check('estado', 'El estado solo puede contener letras').isNumeric(),
        check('email', 'El email es obligatorio').not().isEmpty(),
        check('email', 'Agrega un email válido').isEmail()
    ],      
    usuarioController.actualizarUsuario
);

router.delete('/:id',
    auth,
    usuarioController.eliminarUsuario
);


module.exports = router;