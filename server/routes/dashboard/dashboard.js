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

const dashboardRouter = Router();
dashboardRouter.get('/', (req, res) => {
  res.render('dashboard/index', { title: 'Dashboard' });
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


export default dashboardRouter