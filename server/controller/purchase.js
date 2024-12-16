import { AdminUser } from '../models/admin.js';
import { Product } from '../models/product.js';
import Purchase from '../models/purchase.js';
export const getSellerPurchases = async (req, res) => {
  const { id } = req.user;
  const user = await AdminUser.findById(id);
  let purchases = await Purchase.find().populate('product');
  console.log(user.is_superuser);

  if (!user.is_superuser) {
    purchases = purchases.filter((p) => p.product.owner.toString() === id);
  }

  res.render('purchase/purchase_list', {
    title: 'All Purchse',
    purchases,
    user,
  });
};

export const verifyChapaPayment = async (req, res) => {
  try {
    const { tx_ref } = req.params;
    const response = await fetch(
      'https://api.chapa.co/v1/transaction/verify/' + tx_ref,
      {
        headers: {
          Authorization: `Bearer ${process.env.CHAPA_SECRET_KEY}`,
        },
      }
    );

    if (response.status === 200) {
      const updatedPurchase = await Purchase.find({
        tx_ref,
      });

      for (let purchase of updatedPurchase) {
        const product = await Product.findById(purchase.product);
        if (product) {
          product.amount -= purchase.amount;
          await product.save();
        }

        purchase.paymentStatus = 'PAID';
        await purchase.save();
      }
    }

    return res.json({ success: true });
  } catch (error) {
    console.log("Payment can't be verfied", error.message);
    res.status(400).json({ error: 'An error occured' });
  }
};
