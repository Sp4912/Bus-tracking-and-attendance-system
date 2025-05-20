const Admin = require('../models/Admin');

async function createDefaultAdmin() {
  try {
    const existingAdmin = await Admin.findOne({ email: 'admin@example.com' });

    if (!existingAdmin) {
      const admin = new Admin({
        name: 'Super Admin',
        email: 'admin@example.com',
        password: 'admin123', // will be hashed via pre-save hook
        schoolname: 'Default School',
        contact: '1234567890'
      });

      await admin.save();
      console.log('✅ Default admin created successfully.');
    } else {
      console.log('⚠️ Default admin already exists.');
    }
  } catch (error) {
    console.error('❌ Error creating default admin:', error.message);
  }
}

module.exports = createDefaultAdmin;
