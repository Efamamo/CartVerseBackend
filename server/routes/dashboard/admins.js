import { Router } from 'express';
import { AdminUser } from '../../models/admin.js';
import { Role } from '../../models/permission.js';
import checkRole from '../../middlewares/requireRole.js';
import { addAdmin, deleteAdmin, updateAdmin } from '../../controller/admin.js';
const adminsRouter = Router();

adminsRouter.get('/', checkRole('can_view_admin_user'), async (req, res) => {
  const admins = await AdminUser.find();
  res.render('admin/admins', {
    title: 'Admins',
    admins: admins,
  });
});

adminsRouter.get(
  '/:id/edit',
  checkRole('can_update_admin_user'),
  async (req, res) => {
    const { id } = req.params;
    const admin = await AdminUser.findById(id);
    const roles = await Role.find();

    res.render('admin/edit_admin', {
      title: 'Edit Admin',
      admin,
      roles,
    });
  }
);

adminsRouter.get(
  '/add',
  checkRole('can_create_admin_user'),
  async (req, res) => {
    const roles = await Role.find();
    res.render('admin/add_admin', { title: 'Add Admin', roles });
  }
);

adminsRouter.post('/add', checkRole('can_create_admin_user'), addAdmin);

adminsRouter.post('/:id/edit', checkRole('can_update_admin_user'), updateAdmin);
adminsRouter.get(
  '/:id/delete',
  checkRole('can_delete_admin_user'),
  deleteAdmin
);

export default adminsRouter;
