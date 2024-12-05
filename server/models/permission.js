import mongoose from 'mongoose';
const PermissionSchema = mongoose.Schema(
  {
    model: { type: String },
    code_name: { type: String, unique: true },
    description: { type: String, unique: true },
    user_type: [String],
  },
  { timestamps: true }
);

const RoleSchema = mongoose.Schema(
  {
    role_name: {
      type: String,
      trim: true,
      unique: [true, 'Role is unique'],
      required: [true, 'Role is required'],
    },
    permissions: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Permission' }],
    is_active: {
      type: Boolean,
      default: false,
    },
    deleted: {
      type: Boolean,
      default: false,
    },
    description: { type: String },
    created_by: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'AdminUser',
      required: [true, 'Creater user is required'],
    },
    updated_by: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  { timestamps: true }
);
export const Permission = mongoose.model(
  'Permission',
  PermissionSchema,
  'Permission'
);
export const Role = mongoose.model('Role', RoleSchema, 'Role');
