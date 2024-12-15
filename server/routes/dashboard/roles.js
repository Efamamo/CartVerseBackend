import { Router } from 'express';
import { Role, Permission } from '../../models/permission.js';
import { addRole, deleteRole, editRole } from '../../controller/role.js';
import checkRole from '../../middlewares/requireRole.js';

const rolesRouter = Router();

rolesRouter.get('/', checkRole('can_view_roles'), async (req, res) => {
  const roles = await Role.find();

  res.render('roles/roles', { title: 'Roles', roles });
});

rolesRouter.get('/add', checkRole('can_create_role'), async (req, res) => {
  const permissions = await Permission.find().sort('code_name');
  res.render('roles/add_role', { title: 'Add Role', permissions });
});

rolesRouter.get('/:id/edit', checkRole('can_update_role'), async (req, res) => {
  const { id } = req.params;
  const role = await Role.findById(id);
  const permissions = await Permission.find().sort('code_name');

  res.render(`roles/edit_role`, {
    title: 'Edit Role',
    role: role,
    permissions,
  });
});

rolesRouter.post('/:id/edit', checkRole('can_update_role'), editRole);

rolesRouter.get('/:id/delete', checkRole('can_delete_role'), deleteRole);

rolesRouter.post('/add', checkRole('can_create_role'), addRole);

export default rolesRouter;
