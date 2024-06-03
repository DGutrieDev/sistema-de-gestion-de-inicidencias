const IncidenciaController = require('../Controllers/IncidenciaController');
const express = require('express');
const router = express.Router();

router.post('/', IncidenciaController.crearIncidencias);
router.get('/', IncidenciaController.obtenerIncidencias);
router.get('/:usuario', IncidenciaController.obtenerIncidenciaUsuario);

module.exports = router;