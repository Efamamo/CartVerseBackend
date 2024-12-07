import { Router } from 'express';
import { Category } from '../../models/category.js';
import { addCategory } from '../../controller/category.js';
const categoriesRouter = Router();

categoriesRouter.get('/', async (req, res) => {
  const categories = await Category.find();

  res.render('category/categories', {
    title: 'Categories',
    categories: categories,
  });
});

categoriesRouter.get('/add', (req, res) => {
  res.render('category/add_category', { title: 'Add Category' });
});

categoriesRouter.post('/add', addCategory);
export default categoriesRouter;
