import express from 'express';
import cors from 'cors';
import { connectToDB } from './database/mongoose.js';
import userRouter from './routes/user.js';
import productRouter from './routes/product.js';
import path from 'path';
import { fileURLToPath } from 'url';

const app = express();
app.use('/uploads/images', express.static(path.join('uploads', 'images')));
app.use(express.json());
app.use(cors());
connectToDB();

app.set('view engine', 'ejs');
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) => {
  res.render('index', { title: 'Dashboard' });
});

app.get('/login', (req, res) => {
  res.render('login', { title: 'Login' });
});

app.get('/forgot-password', (req, res) => {
  res.render('forgot_password', { title: 'Forgot Password' });
});

app.get('/reset-password', (req, res) => {
  res.render('reset_password', { title: 'Reset Password' });
});

app.get('/products', (req, res) => {
  res.render('products', { title: 'Products' });
});

app.get('/add-product', (req, res) => {
  res.render('add_product', { title: 'Add Product' });
});

app.get('/sales-report', (req, res) => {
  res.render('sales_report', { title: 'Sales Report' });
});

app.get('/permissions', (req, res) => {
  res.render('permissions', { title: 'Permissions' });
});

app.get('/roles', (req, res) => {
  res.render('roles', { title: 'Roles' });
});

app.get('/add-role', (req, res) => {
  res.render('add_role', { title: 'Add Role' });
});

app.get('/admins', (req, res) => {
  res.render('admins', { title: 'Admins' });
});

app.get('/add-admin', (req, res) => {
  res.render('add_admin', { title: 'Add Admin' });
});

app.get('/users', (req, res) => {
  res.render('users', { title: 'Users' });
});

app.get('/categories', (req, res) => {
  res.render('categories', { title: 'Categories' });
});

app.get('/add-category', (req, res) => {
  res.render('add_category', { title: 'Add Category' });
});

app.get('/sellers', (req, res) => {
  res.render('sellers', { title: 'Sellers' });
});

app.get('/add-seller', (req, res) => {
  res.render('add_seller', { title: 'Add Seller' });
});

app.get('/purchases', (req, res) => {
  res.render('purchase_list', { title: 'All Purchse' });
});

app.get('/paid-purchase', (req, res) => {
  res.render('paid_purchase', { title: 'Paid Purchase' });
});

app.get('/sold-books', (req, res) => {
  res.render('sold_books', { title: 'Sold Books' });
});

app.get('/pending-purchase', (req, res) => {
  res.render('pending_purchase', { title: 'Pending Purchase' });
});

app.get('/wishlists', (req, res) => {
  res.render('wishlists', { title: 'Wishlists' });
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
