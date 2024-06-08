const RiesgosController = require('../Controllers/RiesgosController');
const express = require('express');
const router = express.Router();

// Rutas GET
router.get('/', RiesgosController.obtenerRiesgos);

module.exports = router;