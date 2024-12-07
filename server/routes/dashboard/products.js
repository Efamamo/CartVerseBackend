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

const productsRouter = Router();

productsRouter.get('/', async (req, res) => {
  const products = await Product.find();
  res.render('products/products', {
    title: 'Products',
    products: products,
  });
});

productsRouter.get('/add', async (req, res) => {
  const categories = await Category.find();
  res.render('products/add_product', {
    title: 'Add Product',
    categories: categories,
  });
});

productsRouter.get('/:id/edit', async (req, res) => {
  const { id } = req.params;
  const product = await Product.findById(id).populate('category');
  const categories = await Category.find();

  res.render('products/edit_product', {
    title: 'Edit Product',
    product: product,
    categories: categories,
  });
});

productsRouter.post('/:id/edit', updateProduct);

productsRouter.get('/:id/delete', deleteProduct);

productsRouter.post('/add', uploadImages, addProduct);

productsRouter.get('/sales-report', (req, res) => {
  res.render('products/sales_report', { title: 'Sales Report', report: [] });
});

export default productsRouter;
