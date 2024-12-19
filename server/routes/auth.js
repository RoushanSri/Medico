import { Router } from 'express';
import { auth } from '../middleware/auth.middleware.js';
import { handleLogin, handleRegister, handleLogout } from '../Controllers/User.controller.js';

const router = Router();

router.route('/register').post(handleRegister);

router.route('/login').post(handleLogin);

router.route('/logout').post(auth, handleLogout);

export default router;