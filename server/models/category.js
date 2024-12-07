import mongoose from 'mongoose';

const categorySchema = mongoose.Schema(
  {
    name_english: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    name_amharic: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    description: {
      type: String,
    },
    is_active: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

export const Category = mongoose.model('Category', categorySchema);
