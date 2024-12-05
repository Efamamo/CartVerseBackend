import { Router } from 'express';

const purchaseRouter = Router();

purchaseRouter.get('/', (req, res) => {
  res.render('purchase/purchase_list', { title: 'All Purchse', purchases: [] });
});

purchaseRouter.get('/sold-products', (req, res) => {
  res.render('products/sold_products', { title: 'Sold Products' });
});

export default purchaseRouter;
