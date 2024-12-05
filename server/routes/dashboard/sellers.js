import { Router } from 'express';

const sellersRouter = Router();

sellersRouter.get('/', (req, res) => {
  res.render('sellers/sellers', {
    title: 'Sellers',
    sellers: [{ name: 'Kaleb', createdAt: '2024-11-27T12:42:39.247+00:00' }],
  });
});

sellersRouter.get('/add', (req, res) => {
  res.render('sellers/add_seller', { title: 'Add Seller' });
});

export default sellersRouter;
