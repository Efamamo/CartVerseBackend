import mongoose, { Mongoose } from 'mongoose';

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },

  price: {
    type: Number,
    required: true,
  },

  main_image: {
    type: String,
    required: true,
  },

  sub_images: [
    {
      type: String,
    },
  ],

  amount: {
    type: Number,
    required: true,
  },

  description: {
    type: String,
    required: true,
  },

  category: {
    type: mongoose.Types.ObjectId,
    required: true,
    ref: 'Category',
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
});

export const Product = mongoose.model('Product', productSchema);
