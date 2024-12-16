import mongoose from 'mongoose';

const purchaseSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Types.ObjectId,
      required: true,
      ref: 'User',
    },

    product: {
      type: mongoose.Types.ObjectId,
      required: true,
      ref: 'Product',
    },

    amount: {
      type: Number,
      required: true,
    },

    tx_ref: {
      type: String,
      required: true,
    },
    paymentStatus: {
      type: String,
      required: true,
    },
    address: {
      latitude: {
        type: String,
        required: true,
      },
      longitude: {
        type: String,
        required: true,
      },
    },
  },
  { timestamps: true }
);

const Purchase = mongoose.model('Purchase', purchaseSchema);

export default Purchase;
