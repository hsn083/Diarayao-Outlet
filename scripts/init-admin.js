const mongoose = require('mongoose');
const Admin = require('../src/models/Admin');
const bcrypt = require('bcryptjs');
const fs = require('fs');
const path = require('path');

// Load environment variables from .env file
const envPath = path.join(__dirname, '../.env');
if (fs.existsSync(envPath)) {
  const envContent = fs.readFileSync(envPath, 'utf-8');
  envContent.split('\n').forEach(line => {
    const [key, ...valueParts] = line.split('=');
    if (key && valueParts.length > 0) {
      process.env[key.trim()] = valueParts.join('=').trim();
    }
  });
}

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  console.error('MONGODB_URI is not defined in environment variables');
  process.exit(1);
}

async function initializeAdmin() {
  try {
    console.log('Connecting to MongoDB...');
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB successfully');

    // Check if admin user already exists
    const existingAdmin = await Admin.findOne({ email: 'diarayaoutlet@gmail.com' });
    
    if (existingAdmin) {
      console.log('Admin user already exists:', existingAdmin.email);
      console.log('Username:', existingAdmin.name);
      console.log('You can login with this user');
    } else {
      console.log('Creating default admin user...');
      
      const admin = new Admin({
        name: 'Diarayaoutlet06',
        email: 'diarayaoutlet@gmail.com',
        password: 'FatimA.Amir.06', // Will be hashed by the pre-save hook
        role: 'super_admin',
        permissions: ['all'],
        isActive: true,
      });

      await admin.save();
      console.log('Default admin user created successfully');
      console.log('Username: Diarayaoutlet06');
      console.log('Password: FatimA.Amir.06');
      console.log('Email: diarayaoutlet@gmail.com');
    }

    // List all admin users
    const allAdmins = await Admin.find({}).select('-password');
    console.log('\nAll admin users in database:');
    allAdmins.forEach(admin => {
      console.log(`- ${admin.name} (${admin.email}) - Role: ${admin.role}`);
    });

  } catch (error) {
    console.error('Error initializing admin:', error);
    process.exit(1);
  } finally {
    await mongoose.disconnect();
    console.log('\nDisconnected from MongoDB');
  }
}

initializeAdmin();
