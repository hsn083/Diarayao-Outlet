// Simple script to set up MongoDB admin user
// Run this with: node scripts/setup-mongodb-admin.js

const https = require('https');

const data = JSON.stringify({
  name: 'Diarayaoutlet06',
  email: 'diarayaoutlet@gmail.com',
  password: 'FatimA.Amir.06'
});

const options = {
  hostname: 'localhost',
  port: 3000,
  path: '/api/admin/setup-mongodb-admin',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Content-Length': data.length
  }
};

const req = https.request(options, (res) => {
  let body = '';
  
  res.on('data', (chunk) => {
    body += chunk;
  });
  
  res.on('end', () => {
    console.log('Response:', body);
    process.exit(0);
  });
});

req.on('error', (error) => {
  console.error('Error:', error.message);
  process.exit(1);
});

req.write(data);
req.end();
