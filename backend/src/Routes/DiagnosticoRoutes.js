const Diagnostico = require('../Controllers/DiagnosticoController');
const express = require('express');
const router = express.Router();

router.post('/crear/:cod_incidencia', Diagnostico.crearDiagnostico);

module.exports = router;