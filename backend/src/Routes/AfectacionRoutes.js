const AfectacionController = require('../Controllers/AfectacionController');
const express = require('express');
const router = express.Router();

// Rutas GET
router.get('/', AfectacionController.obtenerAfectaciones);

module.exports = router;
