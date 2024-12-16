import { Router } from 'express';
import { Permission } from '../../models/permission.js';
import checkRole from '../../middlewares/requireRole.js';
import { AdminUser } from '../../models/admin.js';

const permissionsRouter = Router();

permissionsRouter.get(
  '/',
  checkRole('can_view_Permissions'),
  async (req, res) => {
    const permissions = await Permission.find();
    const user = await AdminUser.findById(req.user.id);

    res.render('permissions/permissions', {
      title: 'Permissions',
      permissions,
      user,
    });
  }
);

export default permissionsRouter;
