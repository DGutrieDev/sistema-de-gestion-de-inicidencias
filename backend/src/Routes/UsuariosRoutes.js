const UsuarioController = require('../Controllers/UsuariosController');
const express = require('express');
const router = express.Router();


router.post('/',UsuarioController.crearUsuario);


module.exports = router;