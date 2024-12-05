import { AdminUser } from '../../models/admin.js';
import { Permission } from '../../models/permission.js';
import bcrypt from 'bcrypt';
import All_Permissions from '../permissions.js';

export const createSuperAdminUser = async (userObject) => {
  try {
    const phone_number = userObject.phone_number;

    AdminUser.findOne({ phone_number }).then((user) => {
      if (user != null) {
        console.error('AdminUser With this Phone Number already exists');
        process.exit(1);
      }
    });

    AdminUser.create(userObject)
      .then(async (newAdminUser) => {
        const hash = await bcrypt.hash(newAdminUser.user_password, 10);
        // save password to user collection
        newAdminUser.user_password = hash;
        newAdminUser.is_superuser = true;
        newAdminUser.is_active = true;
        newAdminUser.user_type = 'ADMIN';
        newAdminUser.roles = [];
        await newAdminUser.save();
        console.dir('Superuser created successfully', { colors: true });
        process.exit(0);
      })
      .catch((error) => {
        console.log(error.message);
        process.exit(1);
      });
  } catch (error) {
    console.log(error.message);
    process.exit(1);
  }
};

export const createPermission = async () => {
  console.log('Creating New Permissions...');
  All_Permissions.map(async (permission, index) => {
    const exist = await Permission.findOne({ code_name: permission.code_name });

    if (exist == null) {
      Permission.create(permission)
        .then((permission) => {
          console.dir(
            `Permission Inserted Successfully --- ${permission.description}`,
            { colors: true }
          );
        })
        .catch((error) => {
          console.log(error.message);
        });
    } else {
      console.dir(`Permission Already Exists --- ${permission.description}`, {
        colors: false,
      });
    }
  });
};
