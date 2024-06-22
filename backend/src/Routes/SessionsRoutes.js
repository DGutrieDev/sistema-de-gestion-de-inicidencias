const { SessionsController } = require('../Controllers/global_controllers');
const express = require('express');
const router = express.Router();

router.post('/login', SessionsController.LogIn);
router.post('/logout', SessionsController.LogOut);

module.exports = router;