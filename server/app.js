import express from 'express';
import cors from 'cors';
import { connectToDB } from './database/mongoose.js';
import userRouter from './routes/user.js';
import productRouter from './routes/product.js';
import path from 'path';
import { fileURLToPath } from 'url';
import { createPermission } from './config/init/index.js';
import { Permission, Role } from './models/permission.js';
const app = express();
app.use('/uploads/images', express.static(path.join('uploads', 'images')));
app.use(express.json());
app.use(cors());
connectToDB();
createPermission();

app.set('view engine', 'ejs');
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) => {
  res.render('dashboard/index', { title: 'Dashboard' });
});

app.get('/login', (req, res) => {
  res.render('auth/login', { title: 'Login' });
});

app.get('/forgot-password', (req, res) => {
  res.render('auth/forgot_password', { title: 'Forgot Password' });
});

app.get('/reset-password', (req, res) => {
  res.render('auth/reset_password', { title: 'Reset Password' });
});

app.get('/products', (req, res) => {
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

app.get('/add-product', (req, res) => {
  res.render('products/add_product', { title: 'Add Product' });
});

app.get('/sales-report', (req, res) => {
  res.render('products/sales_report', { title: 'Sales Report', report: [] });
});

app.get('/permissions', async (req, res) => {
  const permissions = await Permission.find();

  res.render('permissions/permissions', {
    title: 'Permissions',
    permissions,
  });
});

app.get('/roles', async (req, res) => {
  const roles = await Role.find();

  res.render('roles/roles', { title: 'Roles', roles });
});

app.get('/add-role', async (req, res) => {
  const permissions = await Permission.find().sort('code_name');
  res.render('roles/add_role', { title: 'Add Role', permissions });
});

app.get('/admins', (req, res) => {
  res.render('admin/admins', {
    title: 'Admins',
    admins: [{ name: 'Yohannes', createdAt: '2024-11-27T12:42:39.247+00:00' }],
  });
});

app.get('/add-admin', (req, res) => {
  res.render('admin/add_admin', { title: 'Add Admin' });
});

app.get('/users', (req, res) => {
  res.render('users/users', {
    title: 'Users',
    users: [{ name: 'Ephrem', createdAt: '2024-11-27T12:42:39.247+00:00' }],
  });
});

app.get('/categories', (req, res) => {
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

app.get('/add-category', (req, res) => {
  res.render('category/add_category', { title: 'Add Category' });
});

app.get('/sellers', (req, res) => {
  res.render('sellers/sellers', {
    title: 'Sellers',
    sellers: [{ name: 'Kaleb', createdAt: '2024-11-27T12:42:39.247+00:00' }],
  });
});

app.get('/add-seller', (req, res) => {
  res.render('sellers/add_seller', { title: 'Add Seller' });
});

app.get('/purchases', (req, res) => {
  res.render('purchase/purchase_list', { title: 'All Purchse', purchases: [] });
});

app.get('/sold-products', (req, res) => {
  res.render('products/sold_products', { title: 'Sold Products' });
});

app.get('/wishlists', (req, res) => {
  res.render('wishlists/wishlists', { title: 'Wishlists' });
});

app.use('/api/v1/auth', userRouter);
app.use('/api/v1/products', productRouter);

//Handles Not Found Routes
app.use((req, res, next) => {
  res.status(404).json({ error: 'Route not found' });
});

app.listen(3003, '0.0.0.0', () => {
  console.log('Server running on port 5001');
});
