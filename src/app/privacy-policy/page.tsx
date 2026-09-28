import { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Shield, Lock, Eye, Cookie, Server, UserCheck, Mail, Phone, Clock } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Privacy Policy | Diarayao Outlet',
  description: 'Learn how Diarayao Outlet protects your privacy and handles your personal information. Our comprehensive privacy policy covers data collection, usage, security, and your rights.',
  keywords: 'privacy policy, data protection, personal information, GDPR compliance, Pakistan privacy law, Diarayao Outlet privacy',
  openGraph: {
    title: 'Privacy Policy | Diarayao Outlet',
    description: 'Learn how Diarayao Outlet protects your privacy and handles your personal information.',
    url: 'https://www.diarayao.com/privacy-policy',
    siteName: 'Diarayao Outlet',
    locale: 'en_PK',
    type: 'website',
    images: [
      {
        url: '/Logo.png',
        width: 1200,
        height: 630,
        alt: 'Diarayao Outlet - Privacy Policy',
      }
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Privacy Policy | Diarayao Outlet',
    description: 'Learn how Diarayao Outlet protects your privacy and handles your personal information.',
    images: ['/Logo.png'],
    creator: '@diarayaooutlet',
    site: '@diarayaooutlet',
  },
  alternates: {
    canonical: 'https://www.diarayao.com/privacy-policy',
  },
};

export default function PrivacyPolicyPage() {
  const lastUpdated = 'July 28, 2026';

  return (
    <>
      <Header />
      <main className="min-h-screen bg-gray-50">
        <div className="bg-gradient-to-br from-pink-700 to-rose-700 text-white py-16">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl font-bold mb-4">Privacy Policy</h1>
            <p className="text-xl text-pink-100">Your privacy is important to us</p>
          </div>
        </div>

        <div className="container mx-auto px-4 py-12 max-w-4xl">
          <Card className="mb-8">
            <CardContent className="p-6">
              <p className="text-sm text-gray-500 mb-4">
                Last Updated: {lastUpdated}
              </p>
              <p className="text-gray-700 leading-relaxed">
                At Diarayao Outlet, we value your privacy and are committed to protecting your personal information. 
                This Privacy Policy explains how we collect, use, store, and protect your information when you visit our website, 
                browse our collections, or place an order.
              </p>
            </CardContent>
          </Card>

          {/* Information We Collect */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <UserCheck className="h-6 w-6 text-pink-600" />
                Information We Collect
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-700">
                When you use our website, we may collect the following information:
              </p>
              
              <div className="space-y-3">
                <div>
                  <h3 className="font-semibold text-gray-800 mb-2">Personal Information</h3>
                  <ul className="list-disc list-inside space-y-1 text-gray-600 ml-4">
                    <li>Full Name</li>
                    <li>Email Address</li>
                    <li>Phone Number</li>
                    <li>Shipping & Billing Address</li>
                    <li>City, Province, Postal Code, Country</li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-semibold text-gray-800 mb-2">Order Information</h3>
                  <ul className="list-disc list-inside space-y-1 text-gray-600 ml-4">
                    <li>Products Ordered</li>
                    <li>Order History</li>
                    <li>Size and Color Preferences</li>
                    <li>Order Notes</li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-semibold text-gray-800 mb-2">Payment Information</h3>
                  <p className="text-gray-600 mb-2">Depending on your selected payment method, we may collect:</p>
                  <ul className="list-disc list-inside space-y-1 text-gray-600 ml-4">
                    <li>Cash on Delivery (COD) details</li>
                    <li>EasyPaisa or JazzCash payment confirmation/screenshot (only for order verification)</li>
                  </ul>
                  <p className="text-gray-600 mt-2">
                    <strong>We never store your debit card, credit card, banking credentials, or financial passwords.</strong>
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold text-gray-800 mb-2">Technical Information</h3>
                  <p className="text-gray-600 mb-2">To improve your shopping experience, we may automatically collect:</p>
                  <ul className="list-disc list-inside space-y-1 text-gray-600 ml-4">
                    <li>IP Address</li>
                    <li>Browser Type</li>
                    <li>Device Information</li>
                    <li>Operating System</li>
                    <li>Website Usage Data</li>
                    <li>Cookies and Analytics Information</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* How We Use Information */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Eye className="h-6 w-6 text-pink-600" />
                How We Use Your Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-700">
                We use your information to:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-600 ml-4">
                <li>Process and confirm your orders</li>
                <li>Deliver your products safely and accurately</li>
                <li>Provide customer support</li>
                <li>Send order updates and delivery notifications</li>
                <li>Respond to your inquiries</li>
                <li>Improve our website performance and user experience</li>
                <li>Prevent fraud and unauthorized transactions</li>
                <li>Send promotional offers and new collection updates (only with your consent)</li>
              </ul>
            </CardContent>
          </Card>

          {/* Payment Security */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Lock className="h-6 w-6 text-pink-600" />
                Payment Security
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-700">
                Your payment security is important to us.
              </p>
              <p className="text-gray-600">
                For Cash on Delivery (COD) orders, only your contact and shipping information is required.
              </p>
              <p className="text-gray-600">
                For EasyPaisa and JazzCash payments, payment screenshots are used solely to verify your payment before processing your order.
              </p>
              <p className="text-gray-700 font-semibold mt-4">
                We do not store:
              </p>
              <ul className="list-disc list-inside space-y-1 text-gray-600 ml-4">
                <li>Credit Card Numbers</li>
                <li>Debit Card Numbers</li>
                <li>ATM PINs</li>
                <li>CVV Codes</li>
                <li>Online Banking Credentials</li>
              </ul>
            </CardContent>
          </Card>

          {/* Cookies */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Cookie className="h-6 w-6 text-pink-600" />
                Cookies
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-700">
                Diarayao Outlet uses cookies to provide a better shopping experience.
              </p>
              <p className="text-gray-600">
                Cookies help us:
              </p>
              <ul className="list-disc list-inside space-y-1 text-gray-600 ml-4">
                <li>Remember your shopping cart</li>
                <li>Save your preferences</li>
                <li>Improve website performance</li>
                <li>Analyze visitor behavior</li>
                <li>Personalize your shopping experience</li>
              </ul>
              <p className="text-gray-600">
                You may disable cookies in your browser settings, but some website features may not function properly.
              </p>
            </CardContent>
          </Card>

          {/* Data Protection */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-6 w-6 text-pink-600" />
                Data Protection
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-700">
                We implement appropriate technical and organizational security measures to protect your personal information against:
              </p>
              <ul className="list-disc list-inside space-y-1 text-gray-600 ml-4">
                <li>Unauthorized access</li>
                <li>Data loss</li>
                <li>Misuse</li>
                <li>Alteration</li>
                <li>Disclosure</li>
              </ul>
              <p className="text-gray-600">
                Although we follow industry-standard security practices, no online system can guarantee complete security.
              </p>
            </CardContent>
          </Card>

          {/* Third Party Services */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Server className="h-6 w-6 text-pink-600" />
                Third-Party Services
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-700">
                We may work with trusted third-party service providers for:
              </p>
              <ul className="list-disc list-inside space-y-1 text-gray-600 ml-4">
                <li>Shipping and Delivery</li>
                <li>Payment Verification</li>
                <li>Website Analytics</li>
                <li>Email Notifications</li>
                <li>Customer Support</li>
              </ul>
              <p className="text-gray-600">
                These service providers only receive the information necessary to perform their services and are required to keep your information confidential.
              </p>
            </CardContent>
          </Card>

          {/* Marketing Communications */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Mail className="h-6 w-6 text-pink-600" />
                Marketing Communications
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-700">
                If you subscribe to our newsletter or promotional updates, we may occasionally send you:
              </p>
              <ul className="list-disc list-inside space-y-1 text-gray-600 ml-4">
                <li>New Arrival Notifications</li>
                <li>Exclusive Discounts</li>
                <li>Seasonal Collections</li>
                <li>Special Offers</li>
              </ul>
              <p className="text-gray-600">
                You can unsubscribe from marketing emails or messages at any time.
              </p>
            </CardContent>
          </Card>

          {/* Your Privacy Rights */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <UserCheck className="h-6 w-6 text-pink-600" />
                Your Privacy Rights
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-700">
                You have the right to:
              </p>
              <ul className="list-disc list-inside space-y-1 text-gray-600 ml-4">
                <li>Access your personal information</li>
                <li>Update or correct your information</li>
                <li>Request deletion of your personal data</li>
                <li>Opt out of promotional communications</li>
                <li>Contact us regarding any privacy concerns</li>
              </ul>
            </CardContent>
          </Card>

          {/* Children's Privacy */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-6 w-6 text-pink-600" />
                Children's Privacy
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-700">
                Our website is intended for users aged 13 years and above. We do not knowingly collect personal information from children.
              </p>
            </CardContent>
          </Card>

          {/* Changes to Policy */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Server className="h-6 w-6 text-pink-600" />
                Changes to This Privacy Policy
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-700">
                We may update this Privacy Policy from time to time to reflect changes in our business, legal requirements, or website functionality.
              </p>
              <p className="text-gray-600">
                The latest version will always be available on this page with the updated revision date.
              </p>
            </CardContent>
          </Card>

          {/* Contact Information */}
          <Card className="mb-8 bg-pink-50 border-pink-200">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Mail className="h-6 w-6 text-pink-600" />
                Contact Us
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-700">
                If you have any questions about this Privacy Policy or how your information is handled, please contact us.
              </p>
              
              <div className="space-y-3">
                <h3 className="font-semibold text-gray-800">Diarayao Outlet</h3>
                
                <div className="flex items-start gap-3">
                  <Mail className="h-5 w-5 text-pink-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-sm text-gray-500">Email</p>
                    <p className="text-gray-700">diarayaoutlet@gmail.com</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Phone className="h-5 w-5 text-pink-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-sm text-gray-500">Phone</p>
                    <p className="text-gray-700">+923713193031</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Clock className="h-5 w-5 text-pink-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-sm text-gray-500">Business Hours</p>
                    <p className="text-gray-700">Monday – Saturday | 10:00 AM – 8:00 PM (PKT)</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </>
  );
}
