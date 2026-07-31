async function getMaintenanceData() {
  try {
    // Use the dedicated maintenance-status endpoint
    const response = await fetch('/api/maintenance-status', {
      cache: 'no-store',
    });
    if (response.ok) {
      const data = await response.json();
      return data;
    }
  } catch (error) {
    console.error('Error fetching maintenance data:', error);
  }
  return null;
}

export default async function MaintenancePage() {
  const data = await getMaintenanceData();
  
  const maintenanceData = data || {
    maintenanceMessage: 'We are currently performing maintenance. Please check back soon.',
    contactEmail: 'Diarayaooutlet@gmail.com',
    phoneNumber: '+92xxxxxxxxx',
    siteName: '',
    
  };
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-emerald-950 to-gray-900">
      <div className="text-center px-4">
        <div className="mb-8">
          {/* Website Logo */}
          <div className="mb-6">
            <img 
              src={maintenanceData.siteLogo} 
              alt={maintenanceData.siteName}
              className="h-24 w-auto mx-auto object-contain"
            />
          </div>
          
          <h1 className="text-5xl font-bold text-white mb-4">Website Under Maintenance</h1>
          <p className="text-xl text-gray-300 max-w-md mx-auto">
            {maintenanceData.maintenanceMessage}
          </p>
        </div>
        
        <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 max-w-md mx-auto">
          <p className="text-gray-300 mb-4">
            For urgent inquiries, please contact us at:
          </p>
          <div className="text-white">
            <div className="contact-item flex items-center gap-4 mb-4">
              <div className="contact-icon w-6 h-6 flex items-center justify-center flex-shrink-0">
                <span>📧</span>
              </div>
              <a href={`mailto:${maintenanceData.contactEmail}`} className="contact-text hover:text-emerald-400 transition-colors">
                {maintenanceData.contactEmail}
              </a>
            </div>
            <div className="contact-item flex items-center gap-4">
              <div className="contact-icon w-6 h-6 flex items-center justify-center flex-shrink-0">
                <span>📞</span>
              </div>
              <a href={`tel:${maintenanceData.phoneNumber}`} className="contact-text hover:text-emerald-400 transition-colors">
                {maintenanceData.phoneNumber}
              </a>
            </div>
          </div>
        </div>
        
        <div className="mt-8">
          <p className="text-gray-400 text-sm">
           ©{new Date().getFullYear()} {maintenanceData.siteName}AlhamdCollection. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
}
