const EstadosController = require('../Controllers/EstadosController');
const express = require('express');
const router = express.Router();

// Rutas GET
router.get('/', EstadosController.obtenerEstados);

module.exports = router;

