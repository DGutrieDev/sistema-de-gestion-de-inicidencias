const IncidenciaController = require('../Controllers/IncidenciaController');
const express = require('express');
const router = express.Router();

router.get('/', IncidenciaController.obtenerIncidencias);
router.get('/usuario/:usuario', IncidenciaController.obtenerIncidenciaUsuario);
router.get('/tecnico/:usuario', IncidenciaController.obtenerIncidenciaAsignada);
router.get('/reparacion/:usuario', IncidenciaController.obtenerIncidenciaReparacion);
router.get('/estado/sin-asignar', IncidenciaController.obtenerIncidenciaSinAsignar);

router.post('/crear', IncidenciaController.crearIncidencias);
router.post('/asignar', IncidenciaController.asignarIncidencias);


module.exports = router;