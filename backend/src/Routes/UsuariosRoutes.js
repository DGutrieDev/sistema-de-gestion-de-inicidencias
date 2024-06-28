const { UsuariosController } = require('../Controllers/global_controllers');
const express = require('express');
const router = express.Router();

router.post('/crearIncidencias', UsuariosController.crearIncidencias);
router.put('/reabrirIncidencia/:cod_Incidencia', UsuariosController.reabrirIncidencia);
router.get('/informacionUsuario/:usuario', UsuariosController.informacionUsuario);
router.get('/obtenerIncidenciasUsuario/:usuario', UsuariosController.obtenerIncidenciasUsuario);

module.exports = router;``