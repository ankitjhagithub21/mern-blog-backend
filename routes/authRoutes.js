const express = require('express');
const authRouter = express.Router();
const authController = require('../controllers/authController');
const { authenticate } = require('../middleware/verifyToken');

// Login route
authRouter.post('/login', authController.login);

// Register route
authRouter.post('/register', authController.register);

//get user
authRouter.get("/user",authenticate,authController.getUser)

//logout
authRouter.get("/logout",authController.logout)



module.exports = authRouter;
