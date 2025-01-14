import { Router } from 'express';
import userRouter from './users.js';
import productsRouter from './products.js';
import adminsRouter from './admins.js';
import authRouter from './auth.js';
import categoriesRouter from './category.js';
import permissionsRouter from './permissions.js';
import purchaseRouter from './purchase.js';
import rolesRouter from './roles.js';
import sellersRouter from './sellers.js';
import wishlistsRouter from './wishlists.js';
import { Product } from '../../models/product.js';
import { User } from '../../models/user.js';
import checkRole from '../../middlewares/requireRole.js';
import { AdminUser } from '../../models/admin.js';
import profileRouter from './profile.js';
const dashboardRouter = Router();
dashboardRouter.get('/', checkRole('can_view_dashboard'), async (req, res) => {
  const users = await User.find();
  const user = await AdminUser.findById(req.user.id);
  const products = await Product.find();
  res.render('dashboard/index', {
    title: 'Dashboard',
    users: users,
    products: products,
    user,
  });
});
dashboardRouter.get('/forbidden', checkRole(''), async (req, res) => {
  const user = await AdminUser.findById(req.user.id);

  res.render('forbidden', {
    title: 'Forbidden',
    user,
  });
});
dashboardRouter.use('/users', userRouter);
dashboardRouter.use('/products', productsRouter);
dashboardRouter.use('/admins', adminsRouter);
dashboardRouter.use('/auth', authRouter);
dashboardRouter.use('/categories', categoriesRouter);
dashboardRouter.use('/permissions', permissionsRouter);
dashboardRouter.use('/purchases', purchaseRouter);
dashboardRouter.use('/roles', rolesRouter);
dashboardRouter.use('/sellers', sellersRouter);
dashboardRouter.use('/wishlists', wishlistsRouter);
dashboardRouter.use('/profile', profileRouter);

export default dashboardRouter;
