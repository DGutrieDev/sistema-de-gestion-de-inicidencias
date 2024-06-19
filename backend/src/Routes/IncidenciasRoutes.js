const IncidenciaController = require('../Controllers/IncidenciaController');
const express = require('express');
const router = express.Router();

router.get('/', IncidenciaController.obtenerIncidencias);
router.get('/incidenciasAsignadas/:id_usuario', IncidenciaController.obtenerIncidenciasAsignadas);
router.get('/incidenciasCreadas/:id_usuario', IncidenciaController.obtenerIncidenciasCreadas);
router.post('/crearIncidencia', IncidenciaController.crearIncidencias);
router.post('/asignarIncidencia', IncidenciaController.asignarIncidencia);


module.exports = router;