const Logueo = require('../Auth/loginService');
const express = require('express');
const router = express.Router();

router.post('/login',Logueo.login);


module.exports = router;