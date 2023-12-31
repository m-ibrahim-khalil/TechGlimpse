const express = require('express');

const authRouter = express.Router();
const { AuthController } = require('../controllers');

authRouter.post('/register', AuthController.register);
authRouter.post('/login', AuthController.login);

module.exports = authRouter;
