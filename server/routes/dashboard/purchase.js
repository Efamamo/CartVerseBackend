import { Router } from 'express';
import checkRole from '../../middlewares/requireRole.js';

const purchaseRouter = Router();

purchaseRouter.get('/', checkRole('can_view_purchases'), (req, res) => {
  res.render('purchase/purchase_list', { title: 'All Purchse', purchases: [] });
});

purchaseRouter.get('/sold-products', (req, res) => {
  res.render('products/sold_products', { title: 'Sold Products' });
});

export default purchaseRouter;
