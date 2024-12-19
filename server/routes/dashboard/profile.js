import { Router } from 'express';
import checkRole from '../../middlewares/requireRole.js';
import { AdminUser } from '../../models/admin.js';
const profileRouter = Router();

profileRouter.get('/', checkRole(''), async (req, res) => {
  const { id } = req.user;
  const user = await AdminUser.findById(id).populate('roles');

  res.render('profile/profile', { title: 'Profile', user });
});

export default profileRouter;
