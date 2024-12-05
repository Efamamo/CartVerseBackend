import { Router } from 'express';
import { Role, Permission } from '../../models/permission.js';

const rolesRouter = Router();

rolesRouter.get('/', async (req, res) => {
  const roles = await Role.find();

  res.render('roles/roles', { title: 'Roles', roles });
});

rolesRouter.get('/add', async (req, res) => {
  const permissions = await Permission.find().sort('code_name');
  res.render('roles/add_role', { title: 'Add Role', permissions });
});

export default rolesRouter;
