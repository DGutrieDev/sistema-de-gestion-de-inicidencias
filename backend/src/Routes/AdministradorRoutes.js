const {AdministradorController} = require("../Controllers/global_controllers");
const express = require("express");
const router = express.Router();

router.get("/obtenerUsuarios", AdministradorController.obtenerUsuarios);
router.post("/crearUsuarios", AdministradorController.crearUsuarios);
router.post("/asignarRoles", AdministradorController.asignarRoles);
router.post("/revocarRoles", AdministradorController.revocarRoles);

module.exports = router;
