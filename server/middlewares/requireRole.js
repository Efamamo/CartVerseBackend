import jsonwebtoken from 'jsonwebtoken';
const jwt = jsonwebtoken;
const SECRET_KEY = process.env.ACCESS_TOKEN_SECRET;
import { Role } from '../models/permission.js';
import { User } from '../models/user.js';
import { AdminUser } from '../models/admin.js';

const checkRole = (currentRole) => async (req, res, next) => {
  const token = req.cookies.accessToken;
  console.log(token);

  if (!token) {
    return res.redirect('/dashboard/auth/login');
  }

  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    const user = await AdminUser.findById(decoded.id);
    req.user = decoded;

    if (user.is_superuser) {
      return next();
    }

    var assignedPermissions = [];

    const roles = await Role.find({ _id: { $in: user.roles } }).populate(
      'permissions'
    );

    roles.forEach((role) => {
      assignedPermissions.push(...role.permissions);
    });

    console.log(roles);

    const hasRole = assignedPermissions.find(
      (assignedPermission) => assignedPermission.code_name === currentRole
    );
    if (!hasRole) {
      return res.redirect('/dashboard/forbidden');
    }

    return next();
  } catch (error) {
    console.log(error);
    return res.redirect('/dashboard/auth/login');
  }
};

export default checkRole;
