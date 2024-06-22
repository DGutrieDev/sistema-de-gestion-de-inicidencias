const { UsuariosController } = require('../Controllers/global_controllers');
const express = require('express');
const router = express.Router();

router.post('/usuarios/crearIncidencias', UsuariosController.crearIncidencias);
router.put('/usuarios/reabrirIncidencia/:cod_Incidencia', UsuariosController.reabrirIncidencia);
router.get('/usuarios/informacionUsuario/:usuario', UsuariosController.informacionUsuario);
router.get('/usuarios/obtenerIncidenciasUsuario/:usuario', UsuariosController.obtenerIncidenciasUsuario);

module.exports = router;