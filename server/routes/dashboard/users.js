import { Router } from 'express';
import { User } from '../../models/user.js';
import checkRole from '../../middlewares/requireRole.js';
const userRouter = Router();

userRouter.get('/', checkRole('can_view_users_module'), async (req, res) => {
  const users = await User.find();
  res.render('users/users', {
    title: 'Users',
    users: users,
  });
});

export default userRouter;
