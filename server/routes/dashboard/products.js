import { Router } from 'express';

const productsRouter = Router();

productsRouter.get('/', (req, res) => {
  res.render('products/products', {
    title: 'Products',
    products: [
      {
        name: 'Jordan 4',
        createdAt: '2024-11-27T12:42:39.247+00:00',
        price: 4500,
      },
      {
        name: 'Jordan 3',
        createdAt: '2023-11-27T12:42:39.247+00:00',
        price: 3000,
      },
    ],
  });
});

productsRouter.get('/add', (req, res) => {
  res.render('products/add_product', { title: 'Add Product' });
});

productsRouter.get('/sales-report', (req, res) => {
  res.render('products/sales_report', { title: 'Sales Report', report: [] });
});

export default productsRouter;
