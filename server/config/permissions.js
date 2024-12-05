const All_Permissions = [
  {
    model: 'Role',
    code_name: 'can_view_users_module',
    description: 'can view users module',
    user_type: ['ADMIN'],
  },
  {
    model: 'LookUp',
    code_name: 'can_view_lookup_module',
    description: 'can view lookup module',
    user_type: ['ADMIN'],
  },
  {
    model: 'ProductCategory',
    code_name: 'can_view_category_module',
    description: 'can view item category module',
    user_type: ['ADMIN'],
  },

  //user
  {
    model: 'AdminUser',
    code_name: 'can_view_dashboard',
    description: 'can view dashboard',
    user_type: ['ADMIN', 'SELLER'],
  },
  {
    model: 'AdminUser',
    code_name: 'can_view_admin_user',
    description: 'can view admin user',
    user_type: ['ADMIN'],
  },
  {
    model: 'AdminUser',
    code_name: 'can_create_admin_user',
    description: 'can create admin user',
    user_type: ['ADMIN'],
  },
  {
    model: 'AdminUser',
    code_name: 'can_update_admin_user',
    description: 'can update admin user',
    user_type: ['ADMIN'],
  },
  {
    model: 'AdminUser',
    code_name: 'can_delete_admin_user',
    description: 'can delete admin user',
    user_type: ['ADMIN'],
  },
  {
    model: 'AdminUser',
    code_name: 'can_suspend_activate_admin_user',
    description: 'can suspend activate admin user',
    user_type: ['ADMIN'],
  },
  {
    model: 'AdminUser',
    code_name: 'can_change_profile',
    description: 'can change profile',
    user_type: ['ADMIN', 'SELLER'],
  },
  {
    model: 'AdminUser',
    code_name: 'can_change_password',
    description: 'can change password',
    user_type: ['ADMIN', 'SELLER'],
  },

  //app user
  {
    model: 'AdminUser',
    code_name: 'can_view_app_user',
    description: 'can view app user',
    user_type: ['ADMIN'],
  },
  {
    model: 'AdminUser',
    code_name: 'can_delete_app_user',
    description: 'can delete app user',
    user_type: ['ADMIN'],
  },

  //ProductCategory
  {
    model: 'ProductCategory',
    code_name: 'can_view_category',
    description: 'can view category',
    user_type: ['ADMIN'],
  },
  {
    model: 'ProductCategory',
    code_name: 'can_create_category',
    description: 'can create category',
    user_type: ['ADMIN'],
  },
  {
    model: 'ProductCategory',
    code_name: 'can_update_category',
    description: 'can update category',
    user_type: ['ADMIN'],
  },
  {
    model: 'ProductCategory',
    code_name: 'can_delete_category',
    description: 'can delete category',
    user_type: ['ADMIN'],
  },

  //Seller
  {
    model: 'Seller',
    code_name: 'can_view_sellers',
    description: 'can view sellers',
    user_type: ['ADMIN'],
  },
  {
    model: 'Seller',
    code_name: 'can_create_sellers',
    description: 'can create sellers',
    user_type: ['ADMIN'],
  },
  {
    model: 'Seller',
    code_name: 'can_update_sellers',
    description: 'can update sellers',
    user_type: ['ADMIN'],
  },
  {
    model: 'Seller',
    code_name: 'can_delete_sellers',
    description: 'can delete sellers',
    user_type: ['ADMIN'],
  },

  //Products
  {
    model: 'Products',
    code_name: 'can_view_products',
    description: 'can view products',
    user_type: ['ADMIN', 'SELLER'],
  },
  {
    model: 'Products',
    code_name: 'can_create_products',
    description: 'can create products',
    user_type: ['ADMIN', 'SELLER'],
  },
  {
    model: 'Products',
    code_name: 'can_update_products',
    description: 'can update products',
    user_type: ['ADMIN', 'SELLER'],
  },
  {
    model: 'Products',
    code_name: 'can_delete_products',
    description: 'can delete products',
    user_type: ['ADMIN', 'SELLER'],
  },
  {
    model: 'Products',
    code_name: 'can_add_audio_products',
    description: 'can add audio products',
    user_type: ['ADMIN', 'SELLER'],
  },

  //Purchases
  {
    model: 'Order',
    code_name: 'can_view_purchases',
    description: 'can view purchases',
    user_type: ['ADMIN', 'SELLER'],
  },

  //roles
  {
    model: 'Role',
    code_name: 'can_view_roles',
    description: 'can view roles',
    user_type: ['ADMIN'],
  },
  {
    model: 'Role',
    code_name: 'can_create_role',
    description: 'can create role',
    user_type: ['ADMIN'],
  },
  {
    model: 'Role',
    code_name: 'can_update_role',
    description: 'can update role',
    user_type: ['ADMIN'],
  },
  {
    model: 'Role',
    code_name: 'can_delete_role',
    description: 'can delete role',
    user_type: ['ADMIN'],
  },
  {
    model: 'Permission',
    code_name: 'can_view_Permissions',
    description: 'can view Permission',
    user_type: ['ADMIN'],
  },
];

export default All_Permissions;
