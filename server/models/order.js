import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
  email: String,
  phoneNumber: String,
  items: Array,
  name: String,
  totalAmount: Number,
  chapaId: String,
  santimId: String,
});
