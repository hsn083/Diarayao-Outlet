const mongoose = require('mongoose');
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

// Define Settings schema inline for migration
const SettingsSchema = new mongoose.Schema({
  general: mongoose.Schema.Types.Mixed,
  seo: {
    metaTitle: String,
    metaDescription: String,
    metaKeywords: String,
    ogTitle: String,
    ogDescription: String,
    ogImage: String,
    twitterCard: String,
    twitterTitle: String,
    twitterDescription: String,
    twitterImage: String,
    robots: String,
    canonicalUrl: String,
    structuredData: {
      organization: {
        name: String,
        url: String,
        logo: String,
        contactPoint: {
          telephone: String,
          contactType: String,
        },
      },
    },
  },
  shipping: mongoose.Schema.Types.Mixed,
  provinces: mongoose.Schema.Types.Mixed,
  payments: mongoose.Schema.Types.Mixed,
  socialMedia: mongoose.Schema.Types.Mixed,
  updatedAt: Date,
}, { timestamps: true });

const Settings = mongoose.models.Settings || mongoose.model('Settings', SettingsSchema);

async function migrateSettingsMetadata() {
  try {
    console.log('Connecting to MongoDB...');
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB successfully');

    // Find existing settings
    const settings = await Settings.findOne();
    
    if (!settings) {
      console.log('No settings found in database. Creating default settings...');
      await Settings.create({});
      console.log('Default settings created with correct metadata');
    } else {
      console.log('Found existing settings. Updating metadata...');
      
      // Update SEO metadata to ensure correct branding
      const updates = {
        'seo.metaTitle': 'Diarayao Outlet | Premium Abayas & Modest Fashion',
        'seo.metaDescription': 'Premium Abayas, Hijabs & Modest Fashion in Pakistan. Quality fabrics, fast delivery.',
        'seo.ogTitle': 'Diarayao Outlet | Premium Abayas & Modest Fashion',
        'seo.ogDescription': 'Premium Abayas, Hijabs & Modest Fashion in Pakistan. Quality fabrics, fast delivery.',
        'seo.twitterTitle': 'Diarayao Outlet | Premium Abayas & Modest Fashion',
        'seo.twitterDescription': 'Premium Abayas, Hijabs & Modest Fashion in Pakistan. Quality fabrics, fast delivery.',
        'seo.canonicalUrl': 'https://www.diarayao.com',
        'seo.structuredData.organization.name': 'Diarayao Outlet',
        'seo.structuredData.organization.url': 'https://www.diarayao.com',
      };

      await Settings.findOneAndUpdate({}, { $set: updates }, { new: true });
      console.log('Settings metadata updated successfully');
    }

    // Verify the updates
    const updatedSettings = await Settings.findOne();
    console.log('\nUpdated SEO Settings:');
    console.log('Meta Title:', updatedSettings.seo.metaTitle);
    console.log('Meta Description:', updatedSettings.seo.metaDescription);
    console.log('OG Title:', updatedSettings.seo.ogTitle);
    console.log('Twitter Title:', updatedSettings.seo.twitterTitle);
    console.log('Twitter Description:', updatedSettings.seo.twitterDescription);
    console.log('Canonical URL:', updatedSettings.seo.canonicalUrl);

  } catch (error) {
    console.error('Error migrating settings metadata:', error);
    process.exit(1);
  } finally {
    await mongoose.disconnect();
    console.log('\nDisconnected from MongoDB');
  }
}

migrateSettingsMetadata();
