const { SupervisorController} = require('../Controllers/global_controllers');
const express = require('express');
const router = express.Router();

router.get('/obtenerIncidenciasTerminadas', SupervisorController.obtenerIncidenciasTerminadas);
router.put('/modificarEstadoIncidencia/:incidencia', SupervisorController.modificarEstadoIncidencia);

module.exports = router;