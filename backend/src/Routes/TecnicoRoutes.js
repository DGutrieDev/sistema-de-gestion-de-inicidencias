const { TecnicoController } = require("../Controllers/global_controllers");
const express = require("express");
const router = express.Router();

router.post("/tecnico/diagnostico/:incidencia", TecnicoController.crearDiagnostico);
router.get("/tecnico/diagnostico/:cod_incidencia", TecnicoController.mostrarDiagnosticoIncidencia);
router.get("/tecnico/incidencias/:usuario", TecnicoController.obtenerIncidenciasAsignadas);
router.put("/tecnico/incidencias/:incidencia", TecnicoController.modificarEstadoIncidencia);

module.exports = router;