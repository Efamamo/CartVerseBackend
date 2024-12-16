import { User } from '../models/user.js';
import { AdminUser } from '../models/admin.js';

export const getWishlistedProducts = async (req, res) => {
  const { id } = req.user;
  const user = await AdminUser.findById(req.user.id);

  const users = await User.find().populate('wishlists');
  const wishlistedProducts = [];
  for (let u of users) {
    for (let product of u.wishlists) {
      if (product.owner == id) {
        wishlistedProducts.push(product);
      }
    }
  }

  res.render('wishlists/wishlists', {
    title: 'Wishlists',
    user,
    wishlistedProducts,
  });
};
