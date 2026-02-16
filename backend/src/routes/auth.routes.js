import { Router } from "express";
import { googleLogin, login, register, requestResetPassword, resetPassword, verifyEmail } from "../controllers/auth.controller.js";

const router = Router();

router.post('/register', register);
router.post('/login', login);
router.get('/verify/:token', verifyEmail);
router.post('/google', googleLogin);
router.post('/request-password-reset', requestResetPassword);
router.post('/reset-password', resetPassword);

export default router;