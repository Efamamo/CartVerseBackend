import { Router } from 'express';
import { AdminUser } from '../../models/admin.js';
import checkRole from '../../middlewares/requireRole.js';

const wishlistsRouter = Router();

wishlistsRouter.get('/', checkRole(''), async (req, res) => {
  const user = await AdminUser.findById(req.user.id);

  res.render('wishlists/wishlists', { title: 'Wishlists', user });
});

export default wishlistsRouter;
