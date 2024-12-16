import { Router } from 'express';
import checkRole from '../../middlewares/requireRole.js';
import { AdminUser } from '../../models/admin.js';
import {
  getSellerPurchases,
  verifyChapaPayment,
  getSoldProducts,
} from '../../controller/purchase.js';
const purchaseRouter = Router();

purchaseRouter.get('/', checkRole('can_view_purchases'), getSellerPurchases);

purchaseRouter.get('/sold-products', checkRole(''), getSoldProducts);

purchaseRouter.get('/:tx_ref', verifyChapaPayment);

export default purchaseRouter;
