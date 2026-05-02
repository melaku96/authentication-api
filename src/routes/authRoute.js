import express from 'express'
import { registerUser, loginUsr } from '../controllers/authController.js';

const router = express.Router();

//ROUTES
router.post('/register', registerUser);
router.post('/login', loginUsr);

export default router;