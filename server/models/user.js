import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
    },
    phoneNumber: {
      type: String,
    },
    password: {
      type: String,
      required: true,
    },
    profile_pic: {
      type: String,
      default: null,
    },

    isAdmin: {
      type: Boolean,
      default: false,
    },
    wishlists: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        default: [],
      },
    ],
    otp: { type: Number },
    otpExpiration: { type: Date },
    isVerified: { type: Boolean, default: false },
    resetPasswordToken: { type: Number },
    resetPasswordExpires: { type: Date },
  },
  { timestamps: true }
);

export const User = mongoose.model('User', userSchema);
