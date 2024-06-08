const UsuarioController = require('../Controllers/UsuariosController');
const express = require('express');
const router = express.Router();

// Rutas GET
router.get('/', UsuarioController.obtenerUsuarios);
router.get('/:id_usuario', UsuarioController.obtenerUsuarioPorId);
router.get('/rol/tecnicos', UsuarioController.obtenerTecnicos);

// Rutas POST
router.post('/rol', UsuarioController.asignarRoles);
router.post('/crear', UsuarioController.crearUsuario);

// Rutas PUT
router.put('/:cedula', UsuarioController.actualizarUsuario);
router.put('/contrasena/:cedula', UsuarioController.modificarContrasena);

// Ruta DELETE
router.delete('/rol/revocar', UsuarioController.revocarRol);



module.exports = router;