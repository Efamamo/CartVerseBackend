import { AdminUser } from '../../models/admin.js';
import { Permission } from '../../models/permission.js';
import All_Permissions from '../permissions.js';
import { hashPassword } from '../../services/password-service.js';
import { connectToDB } from '../../database/mongoose.js';

export const createSuperAdminUser = async (userObject) => {
  try {
    await connectToDB();
    const email = userObject.email;
    let user = await AdminUser.findOne({ email_address: email });

    if (user) {
      return { error: 'AdminUser With this email already exists' };
    }

    const phone = userObject.phoneNumber;

    user = await AdminUser.findOne({ phone_number: phone });

    if (user) {
      return { error: 'AdminUser With this phone number already exists' };
    }

    const hashedPassword = await hashPassword(userObject.password);

    const newAdmin = new AdminUser({
      passcode: userObject.passcode,
      email_address: userObject.email,
      user_password: hashedPassword,
      phone_number: userObject.phoneNumber,
      first_name: userObject.firstName,
      last_name: userObject.lastName,
      is_superuser: true,
    });

    await newAdmin.save();
    return {};
  } catch (error) {
    return { error: error.message };
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
