const Diagnostico = require('../Controllers/DiagnosticoController');
const express = require('express');
const router = express.Router();

router.get('/obtener/:cod_incidencia', Diagnostico.obtenerDiagnosticosPorIncidencia);
router.post('/crear/:cod_incidencia', Diagnostico.crearDiagnostico);


module.exports = router;