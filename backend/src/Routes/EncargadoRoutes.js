const { EncargadoController } = require('../Controllers/global_controllers');
const express = require('express');
const router = express.Router();

router.get('/incidencias', EncargadoController.obtenerIncidenciasRegistradas);
router.get('/tecnicos', EncargadoController.obtenerTecnicos);
router.get('/estados', EncargadoController.obtenerEstados);
router.get('/riesgos', EncargadoController.obtenerRiesgos);
router.get('/categorias', EncargadoController.obtenerCategorias);
router.get('/afectaciones', EncargadoController.obtenerAfectaciones);
router.get('/prioridades', EncargadoController.obtenerPrioridades);
router.post('/asignar', EncargadoController.asignarIncidencia);

module.exports = router;