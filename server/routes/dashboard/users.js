import { Router } from 'express';

const userRouter = Router();

userRouter.get('/', (req, res) => {
  res.render('users/users', {
    title: 'Users',
    users: [{ name: 'Ephrem', createdAt: '2024-11-27T12:42:39.247+00:00' }],
  });
});

export default userRouter;
