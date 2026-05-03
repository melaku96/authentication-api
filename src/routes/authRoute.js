import express from 'express'
import { registerUser, loginUsr, uploadProfile, userProfile } from '../controllers/authController.js';
import { refreshToken } from '../utils/refreshToken.js';
import { forgotPassword, resetPassword } from '../utils/resetPassword.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';
import upload from '../middlewares/uploadMiddleware.js';

const router = express.Router();

//ROUTES
router.post('/register', registerUser);
router.post('/login', loginUsr);
router.post('/refresh', refreshToken)
router.post('/forgot-password', forgotPassword)
router.put('/reset-password/:token', resetPassword)
router.get('/profile/:id', authMiddleware, userProfile)
router.put('/upload-profile-img', authMiddleware, upload.single('profile'), uploadProfile);
export default router;