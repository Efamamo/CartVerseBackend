import { Router } from 'express';

const authRouter = Router();

authRouter.get('/login', (req, res) => {
  res.render('auth/login', { title: 'Login' });
});

authRouter.get('/forgot-password', (req, res) => {
  res.render('auth/forgot_password', { title: 'Forgot Password' });
});

authRouter.get('/reset-password', (req, res) => {
  res.render('auth/reset_password', { title: 'Reset Password' });
});

export default authRouter;
