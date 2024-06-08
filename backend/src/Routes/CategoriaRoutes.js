const CatetegoriaController = require('../Controllers/CategoriasController');
const express = require('express');
const router = express.Router();

// Rutas GET
router.get('/', CatetegoriaController.obtenerCategorias);

module.exports = router;