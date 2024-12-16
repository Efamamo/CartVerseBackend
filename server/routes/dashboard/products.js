import { Router } from 'express';
import { Product } from '../../models/product.js';
import { uploadImages } from '../../middlewares/fileUpload.js';
import {
  addProduct,
  checkout,
  deleteProduct,
  getProductById,
  getProducts,
  updateProduct,
  updateProductImages,
} from '../../controller/product.js';
import { Category } from '../../models/category.js';
import checkRole from '../../middlewares/requireRole.js';
import { AdminUser } from '../../models/admin.js';

const productsRouter = Router();

productsRouter.get('/', checkRole('can_view_products'), async (req, res) => {
  const { id } = req.user;
  const user = await AdminUser.findById(id);
  let products = await Product.find();

  if (!user.is_superuser) {
    products = await Product.find({ owner: id });
  }

  res.render('products/products', {
    title: 'Products',
    products: products,
    user,
  });
});

productsRouter.get(
  '/add',
  checkRole('can_create_products'),
  async (req, res) => {
    const categories = await Category.find();
    const user = await AdminUser.findById(req.user.id);

    res.render('products/add_product', {
      title: 'Add Product',
      categories: categories,
      user,
    });
  }
);

productsRouter.get(
  '/:id/edit',
  checkRole('can_update_products'),
  async (req, res) => {
    const { id } = req.params;
    const product = await Product.findById(id).populate('category');
    const categories = await Category.find();
    const user = await AdminUser.findById(req.user.id);

    res.render('products/edit_product', {
      title: 'Edit Product',
      product: product,
      categories: categories,
      user,
    });
  }
);

productsRouter.post(
  '/:id/edit',
  checkRole('can_update_products'),
  updateProduct
);

productsRouter.get(
  '/:id/delete',
  checkRole('can_delete_products'),
  deleteProduct
);

productsRouter.post(
  '/add',
  checkRole('can_create_products'),
  uploadImages,
  addProduct
);

productsRouter.get('/sales-report', checkRole(''), async (req, res) => {
  const { id } = req.user;
  const user = await AdminUser.findById(req.user.id);

  res.render('products/sales_report', {
    title: 'Sales Report',
    report: [],
    user,
  });
});

export default productsRouter;
