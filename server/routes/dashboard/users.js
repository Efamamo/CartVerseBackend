import { Router } from 'express';
import { User } from '../../models/user.js';
import checkRole from '../../middlewares/requireRole.js';
import { AdminUser } from '../../models/admin.js';

const userRouter = Router();

userRouter.get('/', checkRole('can_view_users_module'), async (req, res) => {
  const users = await User.find();
  const user = await AdminUser.findById(req.user.id);

  res.render('users/users', {
    title: 'Users',
    users: users,
    user,
  });
});

export default userRouter;
