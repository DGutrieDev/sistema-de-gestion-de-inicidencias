const { TecnicoController } = require("../Controllers/global_controllers");
const express = require("express");
const router = express.Router();

router.post("/diagnostico/:incidencia", TecnicoController.crearDiagnostico);
router.get("/diagnostico/:cod_incidencia", TecnicoController.mostrarDiagnosticoIncidencia);
router.get("/incidencias/:usuario", TecnicoController.obtenerIncidenciasAsignadas);
router.put("/incidencias/:incidencia", TecnicoController.modificarEstadoIncidencia);

module.exports = router;