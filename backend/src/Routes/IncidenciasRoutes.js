const IncidenciaController = require('../Controllers/IncidenciaController');
const express = require('express');
const router = express.Router();

router.get('/', IncidenciaController.obtenerIncidencias);
router.get('/:usuario', IncidenciaController.obtenerIncidenciaUsuario);

router.post('/crear', IncidenciaController.crearIncidencias);

module.exports = router;