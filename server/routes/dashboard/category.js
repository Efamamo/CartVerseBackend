import { Router } from 'express';
import { Category } from '../../models/category.js';
import {
  addCategory,
  deleteCategory,
  updateCategory,
} from '../../controller/category.js';
import checkRole from '../../middlewares/requireRole.js';
import { AdminUser } from '../../models/admin.js';

const categoriesRouter = Router();

categoriesRouter.get('/', checkRole('can_view_category'), async (req, res) => {
  const categories = await Category.find();
  const user = await AdminUser.findById(req.user.id);

  res.render('category/categories', {
    title: 'Categories',
    categories: categories,
    user,
  });
});

categoriesRouter.get(
  '/add',
  checkRole('can_create_category'),
  async (req, res) => {
    const user = await AdminUser.findById(req.user.id);

    res.render('category/add_category', { title: 'Add Category', user });
  }
);
categoriesRouter.post(
  '/:id/edit',
  checkRole('can_update_category'),
  updateCategory
);
categoriesRouter.get(
  '/:id/delete',
  checkRole('can_delete_category'),
  deleteCategory
);
categoriesRouter.get(
  '/:id/edit',
  checkRole('can_update_category'),
  async (req, res) => {
    const { id } = req.params;
    const category = await Category.findById(id);
    const user = await AdminUser.findById(req.user.id);

    res.render('category/edit_category', {
      title: 'Edit Category',
      category: category,
      user,
    });
  }
);

categoriesRouter.post('/add', checkRole('can_create_category'), addCategory);
export default categoriesRouter;
