import { validationResult } from 'express-validator';
import { formatErrors, isValidPhoneNumber, refresh } from '../lib/utils.js';
import {
  comparePasswords,
  hashPassword,
} from '../services/password-service.js';
import {
  generateToken,
  generateRefreshToken,
} from '../services/jwt-services.js';
import jsonwebtoken from 'jsonwebtoken';
import { User } from '../models/user.js';
import sendEmailVerification from '../mails/verification.js';
import crypto from 'crypto';
import { sendPasswordToken } from '../mails/reset.js';
import { Product } from '../models/product.js';
import mongoose from 'mongoose';
import sendSMSverification from '../mails/sms.js';
import validator from 'validator';
const jwt = jsonwebtoken;

export const login = async (req, res) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: formatErrors(errors) });
    }

    const { emailOrPhone, password } = req.body;

    const user = await User.findOne({
      $or: [{ email: emailOrPhone }, { phoneNumber: emailOrPhone }],
    });

    if (!user) return res.sendStatus(401);

    const match = await comparePasswords(password, user.password);
    if (!match) return res.sendStatus(401);

    if (!user.isVerified)
      return res.status(422).json({ message: 'verify your account' });

    const token = generateToken(user);
    const refreshToken = generateRefreshToken(user);

    res.status(201).json({ accessToken: token, refreshToken: refreshToken });
  } catch (e) {
    console.log(e);
    res.status(500).json({ error: e });
  }
};

export const signup = async (req, res) => {
  try {
    // Check Validation Errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: formatErrors(errors) });
    }

    // Extract Fields
    let { name, password, email, phoneNumber } = req.body;

    // Check Signup Options
    if (phoneNumber) {
      if (!isValidPhoneNumber(phoneNumber)) {
        return res
          .status(400)
          .json({ errors: { phoneNumber: 'Invalid Phone Number' } });
      }

      email = null;
    } else {
      // Check Email Validity
      if (!email || !validator.isEmail(email)) {
        return res.status(400).json({ errors: { email: 'Invalid Email' } });
      }
      phoneNumber = null;
    }

    // Figure out the query
    const query = phoneNumber ? { phoneNumber } : { email };
    const user = await User.findOne(query);

    if (user) {
      // If verified user Exists return 409
      if (user.isVerified) {
        if (phoneNumber) {
          return res.status(409).json({
            errors: {
              phoneNumber: `The provided phone number is already in use. Please try a different one.`,
            },
          });
        } else {
          return res.status(409).json({
            errors: {
              email: `The provided email is already in use. Please try a different one.`,
            },
          });
        }
      } else {
        // If OTP if not expired redirect to otp
        if (user.otpExpiry > new Date()) {
          return res.sendStatus(201);
        }
        // Generate new otp
        else {
          const otp = crypto.randomInt(1000, 9999);
          const otpExpiration = Date.now() + 10 * 60 * 1000;
          user.otp = otp;
          user.otpExpiration = otpExpiration;

          await user.save();

          if (phoneNumber) {
            await sendSMSverification(phoneNumber, `Your OTP: ${otp}`);
          } else {
            await sendEmailVerification(user);
          }
          return res.sendStatus(201);
        }
      }
    }

    const hashedPassword = await hashPassword(password);

    const otp = crypto.randomInt(1000, 9999);
    const otpExpiration = Date.now() + 10 * 60 * 1000;

    const newUser = new User({
      name,
      password: hashedPassword,
      isAdmin: false,
      email,
      otp,
      phoneNumber,
      otpExpiration,
    });

    await newUser.save();

    if (phoneNumber) {
      await sendSMSverification(phoneNumber, `Your OTP: ${otp}`);
    } else {
      await sendEmailVerification(newUser);
    }

    res.sendStatus(201);
  } catch (e) {
    console.log(e);
    res.status(500).json({ errors: { server: e } });
  }
};

export const resendOTP = async (req, res) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: formatErrors(errors) });
    }

    const { email } = req.body;
    const user = await User.findOne({ email });

    if (!user) return res.status(404).json({ error: 'User not found' });

    if (user.isVerified) {
      return res.status(400).json({ message: 'User already verified' });
    }

    const otp = crypto.randomInt(100000, 999999);
    const otpExpiration = Date.now() + 10 * 60 * 1000;

    user.otp = otp;
    user.otpExpiration = otpExpiration;

    await user.save();

    await sendVerification(user);
    res.sendStatus(200);
  } catch (e) {
    res.status(500).json({ error: e });
  }
};

export const verifyUser = async (req, res) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: formatErrors(errors) });
    }

    const { emailOrPhone, otp } = req.body;

    console.log(emailOrPhone);

    const user = await User.findOne({
      $or: [{ email: emailOrPhone }, { phoneNumber: emailOrPhone }],
    });

    if (!user) return res.status(400).json({ message: 'User not found' });

    const token = generateToken(user);
    const refreshToken = generateRefreshToken(user);

    if (user.isVerified) {
      return res
        .status(201)
        .json({ accessToken: token, refreshToken: refreshToken });
    }

    if (user.otp !== parseInt(otp) || Date.now() > user.otpExpiration) {
      return res.status(400).json({ message: 'Invalid or expired OTP' });
    }

    user.isVerified = true;
    user.otp = null;
    user.otpExpiration = null;
    await user.save();

    res.status(201).json({ accessToken: token, refreshToken: refreshToken });
  } catch (e) {
    console.log(e);
    res.status(500).json({ error: e });
  }
};

export const refreshToken = async (req, res) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ error: 'token is required' });
    }
    const { token } = req.body;

    if (!token) {
      return res.sendStatus(401);
    }

    t = refresh(token);

    if (!t) {
      return res.status(401).json({ error: 'Invalid refresh token' });
    }

    res.json({ accessToken: t });
  } catch (e) {
    res.status(500).json({ error: e });
  }
};

export const verify = async (req, res) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ error: 'token is required' });
    }
    const token = req.headers.authorization?.split(' ')[1];
    console.log(token);

    if (!token) {
      return res.sendStatus(401);
    }

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
      if (err) {
        const token = refresh(req.token);
        if (!token) {
          return res.sendStatus(401);
        }
      }

      return res.json({ accessToken: token, refreshToken: '' });
    });
  } catch (e) {
    res.status(500).json({ error: e });
  }
};

export const changePassword = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: formatErrors(errors) });
    }

    const { oldPassword, newPassword } = req.body;

    const user = await User.findById(req.user.id);
    const match = await comparePasswords(oldPassword, user.password);
    if (!match) {
      return res.status(422).json({ error: 'old Password is incorrect' });
    }

    const hashedPassword = await hashPassword(newPassword);

    user.password = hashedPassword;
    await user.save();

    return res.sendStatus(204);
  } catch (e) {
    console.log(e);
    res.status(500).json({ error: e });
  }
};

export const forgotPassword = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: formatErrors(errors) });
    }


    const { emailOrPhone } = req.body;
    

    const user = await User.findOne({
      $or: [{ email: emailOrPhone }, { phoneNumber: emailOrPhone }],
    });
    if (!user) {
      return res.status(404).send('User not found');
    }

    const token = crypto.randomInt(1000, 9999);
    user.resetPasswordToken = token;
    user.resetPasswordExpires = Date.now() + 3600000;

    await user.save();

    if (user.email) {
      await sendPasswordToken(token, user);
    } else {
      await sendSMSverification(user.phoneNumber, `Your Token: ${token}`);
    }

    res.sendStatus(200);
  } catch (e) {
    res.status(500).json({ error: e });
  }
};

export const resetPassword = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: formatErrors(errors) });
    }

    const { email, token, newPassword } = req.body;

    console.log(email)

    const user = await User.findOne({
      $or: [{ email: email }, { phoneNumber: email }],
    });

    if (!user) return res.status(404).json({ message: 'User not found' });

    if (
      user.resetPasswordToken !== parseInt(token) ||
      Date.now() > user.resetPasswordExpires
    ) {
      return res.status(422).json({ message: 'Invalid or expired OTP' });
    }

    user.password = await hashPassword(newPassword);
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;

    await user.save();
    res.json({ message: 'Password has been reset' });
  } catch (e) {
    res.status(500).json({ error: e });
  }
};

export const getWishlists = async (req, res) => {
  try {
    const { id } = req.user;
    const user = await User.findById(id).populate('wishlists');

    if (!user) return res.sendStatus(401);

    res.json(user.wishlists);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const getProfile = async (req, res) => {
  const { id } = req.user;

  try {
    const user = await User.findById(id).select('-password');
    if (!user) return res.sendStatus(401);
    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const updateProfile = async (req, res) => {
  const { id } = req.user;

  try {
    const user = await User.findById(id);
    if (!user) return res.sendStatus(401);

    const updateData = {};
    const allowedFields = ['name'];

    allowedFields.forEach((field) => {
      if (req.body[field] !== undefined) {
        updateData[field] = req.body[field];
      }
    });

    const u = await User.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    });

    res.json(u);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const toggleWishlist = async (req, res) => {
  const { id } = req.user;
  const { pid } = req.params;

  if (!mongoose.Types.ObjectId.isValid(pid)) {
    return res.status(400).json({ error: 'Invalid Product ID' });
  }

  try {
    const user = await User.findById(id);
    if (!user) return res.sendStatus(401);

    if (user.wishlists.includes(pid)) {
      user.wishlists = user.wishlists.filter((product_ID) => product_ID != pid); // Remove product from wishlists
      await user.save();
      return res.sendStatus(200);
    }

    const product = await Product.findById(pid);
    if (!product) {
      return res.status(404).json({ error: 'Product Not Found' });
    }

    user.wishlists.push(pid);
    await user.save();

    const updatedUser = await User.findById(id).populate('wishlists');
    res.sendStatus(200);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export async function googleOauth(req, res) {
  const { idToken } = req.body;

  try {
    // Verify the ID token
    const ticket = await client.verifyIdToken({
      idToken,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();
    console.log(payload);
    const userId = payload['sub'];

    // Generate access and refresh tokens
    const accessToken = generateToken(userId);
    const refreshToken = generateRefreshToken(userId);

    res.json({ accessToken, refreshToken });
  } catch (error) {
    res.status(401).send('Invalid Google Token');
  }
}
