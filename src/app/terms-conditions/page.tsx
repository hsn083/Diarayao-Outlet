import { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FileText, ShoppingCart, User, CreditCard, Truck, AlertTriangle, Scale, Mail, Phone, Clock, Shield, Ban } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Terms & Conditions | Diarayao Outlet',
  description: 'Read the terms and conditions for using Diarayao Outlet website and services.',
};

export default function TermsConditionsPage() {
  const lastUpdated = 'July 28, 2026';

  return (
    <>
      <Header />
      <main className="min-h-screen bg-gray-50">
        <div className="bg-gradient-to-br from-pink-700 to-rose-700 text-white py-16">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl font-bold mb-4">Terms & Conditions</h1>
            <p className="text-xl text-pink-100">Please read these terms carefully before using our website</p>
          </div>
        </div>

        <div className="container mx-auto px-4 py-12 max-w-4xl">
          <Card className="mb-8">
            <CardContent className="p-6">
              <p className="text-sm text-gray-500 mb-4">
                Last Updated: {lastUpdated}
              </p>
              <p className="text-gray-700 leading-relaxed">
                Welcome to Diarayao Outlet. By accessing or using our website, you agree to comply with and be bound by these Terms & Conditions. 
                Please read them carefully before browsing or placing an order.
              </p>
            </CardContent>
          </Card>

          {/* Introduction */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-6 w-6 text-pink-600" />
                Introduction
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-700">
                These Terms & Conditions govern your access to and use of the Diarayao Outlet website, including all products, services, and content available through it.
              </p>
              <p className="text-gray-700">
                By using this website, you acknowledge that you have read, understood, and agreed to these Terms. If you do not agree with any part of these Terms, please discontinue using our website.
              </p>
            </CardContent>
          </Card>

          {/* Website Usage */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-6 w-6 text-pink-600" />
                Website Usage
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-700">
                You may use our website only for lawful personal shopping purposes.
              </p>
              <p className="text-gray-700 font-semibold">You agree not to:</p>
              <ul className="list-disc list-inside space-y-2 text-gray-600 ml-4">
                <li>Use the website for any illegal or unauthorized purpose.</li>
                <li>Copy, reproduce, distribute, or exploit any website content without written permission.</li>
                <li>Attempt to gain unauthorized access to our servers or systems.</li>
                <li>Upload viruses, malware, or harmful software.</li>
                <li>Interfere with the security or proper functioning of the website.</li>
                <li>Misuse promotional offers, discounts, or coupon codes.</li>
              </ul>
            </CardContent>
          </Card>

          {/* Account Responsibility */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-6 w-6 text-pink-600" />
                Account Responsibility
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-700">
                If you create an account with Diarayao Outlet, you are responsible for:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-600 ml-4">
                <li>Keeping your password secure.</li>
                <li>Maintaining accurate account information.</li>
                <li>All activities that occur under your account.</li>
                <li>Informing us immediately if you suspect unauthorized access.</li>
              </ul>
              <p className="text-gray-700">
                We reserve the right to suspend or terminate accounts involved in suspicious or fraudulent activities.
              </p>
            </CardContent>
          </Card>

          {/* Product Information */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ShoppingCart className="h-6 w-6 text-pink-600" />
                Product Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-700">
                We strive to display our abayas, hijabs, and modest fashion products as accurately as possible.
              </p>
              <p className="text-gray-700 font-semibold">However:</p>
              <ul className="list-disc list-inside space-y-2 text-gray-600 ml-4">
                <li>Product colors may vary slightly due to screen settings and lighting.</li>
                <li>Measurements may have a small tolerance.</li>
                <li>Product availability may change without prior notice.</li>
                <li>Prices may change at any time without notice.</li>
                <li>We reserve the right to discontinue or update products whenever necessary.</li>
              </ul>
            </CardContent>
          </Card>

          {/* Orders */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ShoppingCart className="h-6 w-6 text-pink-600" />
                Orders
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-semibold text-gray-800 mb-2">Order Confirmation</h3>
                <p className="text-gray-600">
                  After placing an order, you will receive an order confirmation via email or WhatsApp. This confirmation acknowledges receipt of your order but does not guarantee acceptance.
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-gray-800 mb-2">Order Acceptance</h3>
                <p className="text-gray-600 mb-2">We reserve the right to cancel or refuse any order if:</p>
                <ul className="list-disc list-inside space-y-1 text-gray-600 ml-4">
                  <li>Product is unavailable.</li>
                  <li>Incorrect pricing is displayed.</li>
                  <li>Fraudulent activity is suspected.</li>
                  <li>Customer information is incomplete or inaccurate.</li>
                </ul>
              </div>

              <div>
                <h3 className="font-semibold text-gray-800 mb-2">Order Cancellation</h3>
                <p className="text-gray-600">
                  Customers may request cancellation before the order has been dispatched. Once an order has been shipped, cancellation may no longer be possible.
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-gray-800 mb-2">Order Modification</h3>
                <p className="text-gray-600">
                  Changes to size, color, address, or contact details should be requested as soon as possible. Once processing begins, modifications may not be available.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Payment Terms */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CreditCard className="h-6 w-6 text-pink-600" />
                Payment Terms
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-700">
                We currently accept:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-600 ml-4">
                <li>Cash on Delivery (COD)</li>
                <li>EasyPaisa</li>
                <li>JazzCash</li>
              </ul>
              <p className="text-gray-700 font-semibold mt-4">For EasyPaisa and JazzCash payments:</p>
              <ul className="list-disc list-inside space-y-1 text-gray-600 ml-4">
                <li>Payment screenshots are required for verification.</li>
                <li>Orders will be processed only after payment confirmation.</li>
              </ul>
              <p className="text-gray-700 mt-2">
                <strong>We do not store your banking or card information.</strong>
              </p>
            </CardContent>
          </Card>

          {/* Shipping Policy */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Truck className="h-6 w-6 text-pink-600" />
                Shipping Policy
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-700">
                We deliver across Pakistan.
              </p>
              <p className="text-gray-700 font-semibold">Estimated delivery time:</p>
              <ul className="list-disc list-inside space-y-1 text-gray-600 ml-4">
                <li>Major Cities: 2–5 Business Days</li>
                <li>Remote Areas: 4–7 Business Days</li>
              </ul>
              <p className="text-gray-700 font-semibold mt-4">Please note:</p>
              <ul className="list-disc list-inside space-y-1 text-gray-600 ml-4">
                <li>Delivery times may vary during sales, holidays, or due to courier delays.</li>
                <li>Shipping charges (if applicable) are displayed during checkout.</li>
                <li>Customers should provide complete and accurate shipping information.</li>
              </ul>
            </CardContent>
          </Card>

          {/* Returns & Exchanges */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="h-6 w-6 text-pink-600" />
                Returns & Exchanges
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-700">
                Customer satisfaction is important to us.
              </p>
              <p className="text-gray-700 font-semibold">Returns or exchanges may be accepted if:</p>
              <ul className="list-disc list-inside space-y-1 text-gray-600 ml-4">
                <li>Request is made within 7 days of receiving the order.</li>
                <li>Product is unused.</li>
                <li>Original tags and packaging remain intact.</li>
                <li>Product is not damaged by the customer.</li>
              </ul>
              <p className="text-gray-700 font-semibold mt-4">Returns will not be accepted for:</p>
              <ul className="list-disc list-inside space-y-1 text-gray-600 ml-4">
                <li>Used products</li>
                <li>Washed garments</li>
                <li>Customized items</li>
                <li>Items without original tags</li>
              </ul>
              <p className="text-gray-600 mt-2">
                Refunds (if approved) are processed after inspection.
              </p>
            </CardContent>
          </Card>

          {/* Pricing & Promotions */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Scale className="h-6 w-6 text-pink-600" />
                Pricing & Promotions
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <ul className="list-disc list-inside space-y-2 text-gray-600 ml-4">
                <li>Prices are listed in Pakistani Rupees (PKR).</li>
                <li>Promotional offers are valid only during specified periods.</li>
                <li>Discount codes cannot be combined unless stated otherwise.</li>
                <li>We reserve the right to modify or end promotions without prior notice.</li>
              </ul>
            </CardContent>
          </Card>

          {/* Intellectual Property */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-6 w-6 text-pink-600" />
                Intellectual Property
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-700">
                All content on the Diarayao Outlet website, including:
              </p>
              <ul className="list-disc list-inside space-y-1 text-gray-600 ml-4">
                <li>Logos</li>
                <li>Images</li>
                <li>Product Photography</li>
                <li>Graphics</li>
                <li>Videos</li>
                <li>Website Design</li>
                <li>Text Content</li>
              </ul>
              <p className="text-gray-700 mt-2">
                is the intellectual property of Diarayao Outlet and may not be copied, reproduced, or used without written permission.
              </p>
            </CardContent>
          </Card>

          {/* User Conduct */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Ban className="h-6 w-6 text-pink-600" />
                User Conduct
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-700">
                While using our website, you agree not to:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-600 ml-4">
                <li>Place fake or fraudulent orders.</li>
                <li>Use abusive or offensive language.</li>
                <li>Submit false information.</li>
                <li>Attempt to hack or disrupt the website.</li>
                <li>Misuse discount offers.</li>
                <li>Violate any applicable laws.</li>
              </ul>
              <p className="text-gray-700 mt-2">
                Any such activity may result in permanent suspension of your account.
              </p>
            </CardContent>
          </Card>

          {/* Limitation of Liability */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Scale className="h-6 w-6 text-pink-600" />
                Limitation of Liability
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-700">
                To the fullest extent permitted by law, Diarayao Outlet shall not be responsible for:
              </p>
              <ul className="list-disc list-inside space-y-1 text-gray-600 ml-4">
                <li>Delays caused by courier companies.</li>
                <li>Temporary website downtime.</li>
                <li>Technical issues beyond our control.</li>
                <li>Minor color variations caused by screen settings.</li>
                <li>Indirect or consequential damages arising from website use.</li>
              </ul>
              <p className="text-gray-700 mt-2">
                Our maximum liability shall never exceed the value of the purchased product.
              </p>
            </CardContent>
          </Card>

          {/* Privacy */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-6 w-6 text-pink-600" />
                Privacy
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-700">
                Your privacy is important to us.
              </p>
              <p className="text-gray-600">
                By using our website, you also agree to our Privacy Policy, which explains how your personal information is collected, stored, and protected.
              </p>
            </CardContent>
          </Card>

          {/* Changes to Terms */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-6 w-6 text-pink-600" />
                Changes to Terms & Conditions
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-700">
                We reserve the right to modify these Terms & Conditions at any time.
              </p>
              <p className="text-gray-600">
                Updated versions will be posted on this page with a revised effective date. Continued use of our website constitutes acceptance of any changes.
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
                If you have any questions regarding these Terms & Conditions, please contact us:
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
                    <p className="text-sm text-gray-500">Phone / WhatsApp</p>
                    <p className="text-gray-700">+92 371 3193031</p>
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
