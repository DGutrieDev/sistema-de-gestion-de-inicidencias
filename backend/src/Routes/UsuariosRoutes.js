const UsuarioController = require('../Controllers/UsuariosController');
const express = require('express');
const router = express.Router();

router.post('/', UsuarioController.crearUsuario);
router.post('/rol', UsuarioController.asignarRoles);
router.put('/:cedula', UsuarioController.actualizarUsuario);
router.delete('/revocar', UsuarioController.revocarRol);


module.exports = router;