import { AdminUser } from '../models/admin.js';
import {
  generateToken,
  generateRefreshToken,
} from '../services/jwt-services.js';
import {
  comparePasswords,
  hashPassword,
} from '../services/password-service.js';
import mongoose from 'mongoose';

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await AdminUser.findOne({ email_address: email });

    if (!user) return res.sendStatus(401);

    const match = await comparePasswords(password, user.user_password);
    if (!match) return res.sendStatus(401);

    const token = generateToken(user);
    const refreshToken = generateRefreshToken(user);

    res.cookie('accessToken', token, {
      maxAge: 1000 * 60 * 20,
      httpOnly: true,
    });

    res.cookie('refreshToken', refreshToken, {
      maxAge: 1000 * 60 * 60 * 72,
      httpOnly: true,
    });
    res.sendStatus(201);
  } catch (e) {
    console.log(e);
    res.status(500).json({ error: e });
  }
};

export const addAdmin = async (req, res) => {
  try {
    const {
      first_name,
      last_name,
      phone_number,
      passcode,
      is_active,
      email_address,
      roles,
      user_password,
    } = req.body;

    const { id } = req.user;

    const hashedPassword = await hashPassword(user_password);

    const newAdmin = new AdminUser({
      first_name,
      last_name,
      phone_number,
      passcode,
      is_active: is_active === 'on' ? true : false,
      email_address,
      roles,
      user_password: hashedPassword,
      created_by: id,
      updated_by: id,
    });

    await newAdmin.save();
    res.redirect('/dashboard/admins');
  } catch (e) {
    console.log(e);
    res.status(500).json({ error: e });
  }
};

export const updateAdmin = async (req, res) => {
  try {
    const id = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: 'Invalid Product ID' });
    }

    const updateData = { updated_by: req.user.id };
    const allowedFields = [
      'first_name',
      'last_name',
      'email_address',
      'phone_number',
      'roles',
      'is_active',
    ];

    allowedFields.forEach((field) => {
      if (req.body[field] !== undefined) {
        updateData[field] = req.body[field];
      }
    });

    updateData['is_active'] = updateData['is_active'] == 'on' ? true : false;

    console.log(updateData);

    // Find product by id and update with the new data
    const admin = await AdminUser.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    });

    if (!admin) {
      return res.status(404).json({ error: 'Admin Not Found' });
    }

    res.redirect('/dashboard/admins');
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Server Error' });
  }
};

export const deleteAdmin = async (req, res) => {
  try {
    const id = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: 'Invalid Product ID' });
    }

    const admin = await AdminUser.findByIdAndDelete(id);

    if (!admin) {
      return res.status(404).json({ error: 'Admin Not Found' });
    }

    res.redirect('/dashboard/admins');
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Server Error' });
  }
};
