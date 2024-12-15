import { Router } from 'express';
import { login } from '../../controller/admin.js';

const authRouter = Router();

authRouter.get('/login', (req, res) => {
  res.render('auth/login', { title: 'Login' });
});

authRouter.post('/login', login);

authRouter.get('/logout', (req, res) => {
  res.clearCookie('accessToken', { path: '/' });
  res.clearCookie('refreshToken', { path: '/' });
  res.redirect('/dashboard/auth/login');
});

authRouter.get('/forgot-password', (req, res) => {
  res.render('auth/forgot_password', { title: 'Forgot Password' });
});

authRouter.get('/reset-password', (req, res) => {
  res.render('auth/reset_password', { title: 'Reset Password' });
});

export default authRouter;
