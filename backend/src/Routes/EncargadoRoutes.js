const { EncargadoController } = require('../Controllers/global_controllers');
const express = require('express');
const router = express.Router();

router.get('/encargado/incidencias', EncargadoController.obtenerIncidenciasRegistradas);
router.get('/encargado/tecnicos', EncargadoController.obtenerTecnicos);
router.post('/encargado/asignar', EncargadoController.asignarIncidencia);

module.exports = router;