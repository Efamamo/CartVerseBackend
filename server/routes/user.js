import { Router } from 'express';
import { check } from 'express-validator';
import {
  changePassword,
  forgotPassword,
  getWishlists,
  googleOauth,
  login,
  refreshToken,
  resendOTP,
  resetPassword,
  signup,
  toggleWishlist,
  verify,
  verifyUser,
  getProfile,
  updateProfile,
} from '../controller/user.js';
import requireToken from '../middlewares/requireToken.js';

const userRouter = Router();

userRouter.post(
  '/login',
  [
    check('emailOrPhone').notEmpty().withMessage("emailOrPhone can't be empty"),
    check('password').notEmpty().withMessage("password can't be empty"),
  ],
  login
);

userRouter.post(
  '/signup',
  [
    check('name').notEmpty().withMessage('name cant be empty'),
    check('name').isLength({ min: 3 }).withMessage('minimum name length is 3'),
    check('password')
      .isLength({ min: 6 })
      .withMessage('minimum password length is 6'),
    check('password')
      .isLength({ max: 50 })
      .withMessage('maximum password lngth is 50'),
  ],
  signup
);

userRouter.post(
  '/verify',
  check('token').notEmpty().withMessage('token is required'),
  verify
);
userRouter.post(
  '/refresh',
  check('token').notEmpty().withMessage('token is required'),
  refreshToken
);

userRouter.patch(
  '/verify-otp',
  [
    check('emailOrPhone').notEmpty().withMessage('emailOrPhone cant be empty'),
    check('otp').notEmpty().withMessage('otp is required'),
  ],
  verifyUser
);
userRouter.post(
  '/send-otp',
  [
    check('email').notEmpty().withMessage('email cant be empty'),
    check('email').normalizeEmail().isEmail().withMessage('invalid email'),
  ],
  resendOTP
);

userRouter.patch(
  '/change-password',
  requireToken,
  [
    check('oldPassword').notEmpty().withMessage('oldPassword is required.'),
    check('newPassword').notEmpty().withMessage('newPassword is required.'),
    check('newPassword')
      .isLength({ min: 6 })
      .withMessage('minimum password length is 6'),

    check('newPassword')
      .isLength({ max: 50 })
      .withMessage('maximum password lngth is 50'),
  ],
  changePassword
);

userRouter.post('/google-auth', googleOauth);

userRouter.patch(
  '/forgot-password',
  [check('emailOrPhone').notEmpty().withMessage('emailOrPhone cant be empty')],
  forgotPassword
);

userRouter.patch(
  '/reset-password',
  [
    check('token').notEmpty().withMessage('token is required.'),

    check('newPassword').notEmpty().withMessage('newPassword is required.'),
    check('newPassword')
      .isLength({ min: 6 })
      .withMessage('minimum password length is 6'),
    check('newPassword')
      .isLength({ max: 50 })
      .withMessage('maximum password lngth is 50'),
  ],
  resetPassword
);

userRouter.get('/profile', requireToken, getProfile);
userRouter.patch('/profile', requireToken, updateProfile);
userRouter.get('/wishlists', requireToken, check(), getWishlists);
userRouter.patch('/wishlists/:pid', requireToken, toggleWishlist);

export default userRouter;
