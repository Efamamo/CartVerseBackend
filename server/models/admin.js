import mongoose from 'mongoose';
import { GENDER_TYPES, USER_TYPES } from '../lib/utils.js';

const AdminUserSchema = mongoose.Schema(
  {
    first_name: {
      type: String,
      trim: true,
      required: [true, 'First Name is required'],
    },
    last_name: {
      type: String,
      trim: true,
      required: [true, 'Last Name is required'],
    },
    phone_number: {
      type: String,
      trim: true,
      unique: [true, 'Phone Number is Unique'],
      required: [true, 'Phone Number is required'],
    },
    passcode: {
      type: String,
      trim: true,
      unique: [true, 'Passcode is Unique'],
      required: [true, 'Passcode is required'],
    },
    gender: {
      type: String,
      enum: GENDER_TYPES,
    },
    is_active: {
      type: Boolean,
      default: false,
    },
    position: {
      type: String,
    },
    email_address: {
      type: String,
      trim: true,
      required: [true, 'Email is required'],
    },
    user_type: {
      type: String,
      enum: USER_TYPES,
    },
    is_superuser: {
      type: Boolean,
      default: false,
    },
    roles: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Role',
      },
    ],
    profile_photo: {
      type: String,
    },
    user_password: {
      type: String,
      required: [true, 'Password is required'],
    },
    last_login: {
      type: Date,
    },
    socketId: String,
    deleted: {
      type: Boolean,
      default: false,
    },
    created_by: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'AdminUser',
    },
    updated_by: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'AdminUser',
    },
  },
  { timestamps: true }
);

export const AdminUser = mongoose.model('AdminUser', AdminUserSchema);
