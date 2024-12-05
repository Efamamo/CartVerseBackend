import { Router } from 'express';

const categoriesRouter = Router();

categoriesRouter.get('/', (req, res) => {
  res.render('category/categories', {
    title: 'Categories',
    categories: [
      {
        name_english: 'Clothes',
        name_amharic: 'አልባሳት',
        is_active: true,
        createdAt: '2024-11-27T12:42:39.247+00:00',
      },
      {
        name_english: 'House',
        name_amharic: 'ቤት',
        is_active: true,
        createdAt: '2024-8-27T12:42:39.247+00:00',
      },
    ],
  });
});

categoriesRouter.get('/add', (req, res) => {
  res.render('category/add_category', { title: 'Add Category' });
});

export default categoriesRouter;
