import { Router } from 'express';
import checkRole from '../../middlewares/requireRole.js';
import { AdminUser } from '../../models/admin.js';
import {
  getSellerPurchases,
  verifyChapaPayment,
} from '../../controller/purchase.js';
const purchaseRouter = Router();

purchaseRouter.get('/', checkRole('can_view_purchases'), getSellerPurchases);

purchaseRouter.get('/sold-products', checkRole(''), async (req, res) => {
  const user = await AdminUser.findById(req.user.id);

  res.render('products/sold_products', { title: 'Sold Products', user });
});

purchaseRouter.get('/:tx_ref', verifyChapaPayment);

export default purchaseRouter;
