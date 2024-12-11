import { Role } from '../models/permission.js';
import mongoose from 'mongoose';
export const addRole = async (req, res) => {
  try {
    const { role_name, permissions } = req.body;
    const role = await Role.findOne({ role_name });

    console.log(role);

    if (role) {
      return res.status(409).json({ error: 'Role name Taken' });
    }

    const newRole = new Role({
      role_name,
      permissions,
    });

    await newRole.save();

    return res.redirect('/dashboard/roles');
  } catch (e) {
    console.log(e);
    return res.status(500).json({ error: 'server error' });
  }
};

export const deleteRole = async (req, res) => {
  try {
    const id = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: 'Invalid Role ID' });
    }

    const role = await Role.findByIdAndDelete(id);

    if (!role) {
      return res.status(404).json({ error: 'Role Not Found' });
    }

    res.redirect('/dashboard/roles');
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Server Error' });
  }
};

export const editRole = async (req, res) => {
  try {
    const { id } = req.params;
    let role = await Role.findById(id);

    if (!role) {
      return res.status(404).json({ error: 'Role not found' });
    }
    const { role_name, permissions } = req.body;

    if (role_name != role.role_name) {
      const role = await Role.findOne({ role_name });
      if (role) {
        return res.status(409).json({ error: 'Role name Taken' });
      }
    }

    role.role_name = role_name;
    role.permissions = permissions;

    await role.save();

    return res.redirect('/dashboard/roles');
  } catch (e) {
    console.log(e);
    return res.status(500).json({ error: 'server error' });
  }
};
