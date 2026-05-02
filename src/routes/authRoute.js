import express from 'express'
import { registerUser, loginUsr } from '../controllers/authController.js';
import { refreshToken } from '../utils/refreshToken.js';
import { forgotPassword, resetPassword } from '../utils/resetPassword.js';

const router = express.Router();

//ROUTES
router.post('/register', registerUser);
router.post('/login', loginUsr);
router.post('/refresh', refreshToken)
router.post('/forgot-password', forgotPassword)
router.put('/reset-password/:token', resetPassword)

export default router;