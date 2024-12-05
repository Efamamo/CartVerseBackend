import { Router } from 'express';

const adminsRouter = Router();

adminsRouter.get('/', (req, res) => {
  res.render('admin/admins', {
    title: 'Admins',
    admins: [{ name: 'Yohannes', createdAt: '2024-11-27T12:42:39.247+00:00' }],
  });
});

adminsRouter.get('/add', (req, res) => {
  res.render('admin/add_admin', { title: 'Add Admin' });
});

export default adminsRouter;
