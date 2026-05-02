import express from 'express'
import { registerUser, loginUsr } from '../controllers/authController.js';
import { refreshToken } from '../utils/refreshToken.js';

const router = express.Router();

//ROUTES
router.post('/register', registerUser);
router.post('/login', loginUsr);
router.post('/refresh', refreshToken)

export default router;