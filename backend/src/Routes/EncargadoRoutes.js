const { EncargadoController } = require('../Controllers/global_controllers');
const express = require('express');
const router = express.Router();

router.get('/incidencias', EncargadoController.obtenerIncidenciasRegistradas);
router.get('/tecnicos', EncargadoController.obtenerTecnicos);
router.post('/asignar', EncargadoController.asignarIncidencia);

module.exports = router;