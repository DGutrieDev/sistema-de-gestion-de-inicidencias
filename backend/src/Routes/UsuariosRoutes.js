const UsuarioController = require('../Controllers/UsuariosController');
const express = require('express');
const router = express.Router();

router.get('/', UsuarioController.obtenerUsuarios);
router.get('/:id_usuario', UsuarioController.obtenerUsuarioPorId);

router.post('/rol', UsuarioController.asignarRoles);
router.post('/crear', UsuarioController.crearUsuario);

router.put('/:cedula', UsuarioController.actualizarUsuario);
router.put('/contraseña/:cedula', UsuarioController.modificarContrasena);

router.delete('/revocar', UsuarioController.revocarRol);


module.exports = router;