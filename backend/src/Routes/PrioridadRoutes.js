const PrioridadesController = require('../Controllers/PrioridadController');
const express = require('express');
const router = express.Router();

// Rutas GET
router.get('/', PrioridadesController.obtenerPrioridades);

module.exports = router;