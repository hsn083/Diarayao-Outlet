'use client';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Truck, 
  Clock, 
  MapPin, 
  Shield,
  CheckCircle,
  Package,
  Phone,
  Mail,
  Search
} from 'lucide-react';

export default function ShippingPage() {
  const shippingMethods = [
    {
      icon: Truck,
      title: 'Standard Delivery',
      deliveryTime: '3–7 Business Days',
      coverage: 'Available across Pakistan',
      price: 'PKR 250',
      details: 'Standard delivery is available for all major cities and many remote areas.',
    },
    {
      icon: Clock,
      title: 'Express Delivery',
      deliveryTime: '1–3 Business Days',
      coverage: 'Selected major cities',
      price: 'PKR 500',
      details: 'Express delivery provides faster shipping for customers who need their orders urgently.',
    },
  ];

  const coverageAreas = [
    'Lahore',
    'Karachi',
    'Islamabad',
    'Rawalpindi',
    'Faisalabad',
    'Multan',
    'Peshawar',
    'Quetta',
    'Sialkot',
    'Gujranwala',
    'Sargodha',
    'Hyderabad',
    'Bahawalpur',
    'Gujrat',
    'Other cities and rural areas',
  ];

  const courierPartners = [
    'TCS',
    'Leopards Courier',
    'M&P Express',
    'Pakistan Post',
    'Other trusted logistics providers',
  ];

  return (
    <>
      <Header />
      <main className="min-h-screen">
        <div className="bg-gradient-to-br from-pink-700 to-rose-700 text-white py-16">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl font-bold mb-4">Shipping Information</h1>
            <p className="text-xl text-pink-100">Fast, secure, and reliable delivery of premium Abayas and Modest Fashion across Pakistan.</p>
          </div>
        </div>

        <div className="container mx-auto px-4 py-12">
          {/* Introduction */}
          <div className="mb-12">
            <Card>
              <CardContent className="p-6">
                <p className="text-gray-700 leading-relaxed">
                  At Diarayao Outlet, we work with trusted courier partners to ensure your orders reach you safely and on time.
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Shipping Methods */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold mb-6">Shipping Methods</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {shippingMethods.map((method, index) => (
                <Card key={index}>
                  <CardHeader>
                    <div className="flex items-center space-x-3">
                      <method.icon className="h-8 w-8 text-pink-600" />
                      <div>
                        <CardTitle>{method.title}</CardTitle>
                        <p className="text-sm text-muted-foreground">{method.deliveryTime}</p>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div>
                      <p className="text-sm font-semibold text-gray-700">Coverage:</p>
                      <p className="text-sm text-muted-foreground">{method.coverage}</p>
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-gray-700">Shipping Charges:</p>
                      <p className="text-sm text-muted-foreground">{method.price}</p>
                    </div>
                    <p className="text-sm text-muted-foreground">{method.details}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Delivery Coverage */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold mb-6">Delivery Coverage</h2>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-start space-x-3 mb-4">
                  <MapPin className="h-6 w-6 text-pink-600 mt-1" />
                  <div>
                    <h3 className="font-semibold mb-2">Nationwide Delivery</h3>
                    <p className="text-muted-foreground mb-4">
                      We deliver premium abayas and modest fashion products throughout Pakistan, including:
                    </p>
                  </div>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
                  {coverageAreas.map((city, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <CheckCircle className="h-4 w-4 text-pink-600" />
                      <span className="text-sm">{city}</span>
                    </div>
                  ))}
                </div>
                <p className="text-sm text-muted-foreground">
                  No matter where you are in Pakistan, we work hard to deliver your order safely to your doorstep.
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Courier Partners */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold mb-6">Courier Partners</h2>
            <Card>
              <CardContent className="p-6">
                <p className="text-muted-foreground mb-4">
                  We partner with reliable courier services to provide secure and timely deliveries. Our delivery partners may include:
                </p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {courierPartners.map((partner, index) => (
                    <div key={index} className="border rounded-lg p-4 text-center border-pink-200">
                      <Package className="h-8 w-8 mx-auto mb-2 text-pink-600" />
                      <p className="font-medium text-sm">{partner}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Shipping Policy */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold mb-6">Shipping Policy</h2>
            <Card>
              <CardContent className="p-6 space-y-6">
                <div className="flex items-start space-x-3">
                  <Shield className="h-6 w-6 text-pink-600 mt-1" />
                  <div>
                    <h3 className="font-semibold mb-2">Order Processing</h3>
                    <p className="text-muted-foreground">
                      Orders are processed within 24–48 hours on business days. Once your order is dispatched, you will receive delivery updates through available contact methods such as SMS, WhatsApp, or email.
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Clock className="h-6 w-6 text-pink-600 mt-1" />
                  <div>
                    <h3 className="font-semibold mb-2">Delivery Time</h3>
                    <p className="text-muted-foreground mb-2">
                      Estimated delivery times:
                    </p>
                    <ul className="list-disc list-inside text-muted-foreground space-y-1">
                      <li>Major Cities: 2–5 Business Days</li>
                      <li>Remote Areas: 4–7 Business Days</li>
                    </ul>
                    <p className="text-muted-foreground mt-2">
                      Delivery times may vary during Eid seasons, sales campaigns, public holidays, or unexpected courier delays. We always try our best to deliver your order as quickly as possible.
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Truck className="h-6 w-6 text-pink-600 mt-1" />
                  <div>
                    <h3 className="font-semibold mb-2">Cash on Delivery (COD)</h3>
                    <p className="text-muted-foreground">
                      We offer Cash on Delivery (COD) across Pakistan. Customers can pay when they receive their order. For high-value orders, we may request advance payment confirmation through EasyPaisa, JazzCash, or Bank Transfer. This helps protect customers and prevents fraudulent orders.
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Search className="h-6 w-6 text-pink-600 mt-1" />
                  <div>
                    <h3 className="font-semibold mb-2">Order Tracking</h3>
                    <p className="text-muted-foreground">
                      Once your order is shipped, tracking details will be shared through SMS, WhatsApp, or email (where applicable). You can contact our support team anytime for order status updates.
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <MapPin className="h-6 w-6 text-pink-600 mt-1" />
                  <div>
                    <h3 className="font-semibold mb-2">Address Changes</h3>
                    <p className="text-muted-foreground">
                      Address changes can be requested within 24 hours of placing your order. After the order has been processed or shipped, we cannot guarantee changes because the package may already be with the courier. Please ensure your Name, Phone number, Complete address, and City details are correct before confirming your order.
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Shield className="h-6 w-6 text-pink-600 mt-1" />
                  <div>
                    <h3 className="font-semibold mb-2">Delivery Issues</h3>
                    <p className="text-muted-foreground">
                      If you experience any issue with your delivery, please contact us as soon as possible. For damaged, missing, or incorrect orders, please contact our support team within 48 hours of receiving your package.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Contact Information */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold mb-6">Contact Us</h2>
            <Card className="bg-pink-50 border-pink-200">
              <CardContent className="p-6">
                <h3 className="font-semibold mb-4 text-gray-800">Diarayao Outlet</h3>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <Mail className="h-5 w-5 text-pink-600 mt-0.5" />
                    <div>
                      <p className="text-sm text-muted-foreground">Email</p>
                      <p className="text-gray-700">diarayaoutlet@gmail.com</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <Phone className="h-5 w-5 text-pink-600 mt-0.5" />
                    <div>
                      <p className="text-sm text-muted-foreground">WhatsApp / Phone</p>
                      <p className="text-gray-700">+92 371 3193031</p>
                    </div>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground mt-4">
                  We are always here to help you with your orders and delivery questions.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
