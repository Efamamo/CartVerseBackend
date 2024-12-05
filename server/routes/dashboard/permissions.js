import { Router } from 'express';
import { Permission } from '../../models/permission.js';

const permissionsRouter = Router();

permissionsRouter.get('/', async (req, res) => {
  const permissions = await Permission.find();

  res.render('permissions/permissions', {
    title: 'Permissions',
    permissions,
  });
});

export default permissionsRouter;
