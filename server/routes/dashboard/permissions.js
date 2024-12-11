import { Router } from 'express';
import { Permission } from '../../models/permission.js';
import checkRole from '../../middlewares/requireRole.js';

const permissionsRouter = Router();

permissionsRouter.get(
  '/',
  checkRole('can_view_Permissions'),
  async (req, res) => {
    const permissions = await Permission.find();

    res.render('permissions/permissions', {
      title: 'Permissions',
      permissions,
    });
  }
);

export default permissionsRouter;
