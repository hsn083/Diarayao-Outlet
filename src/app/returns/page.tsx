'use client';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  RefreshCw, 
  Shield, 
  Clock, 
  CheckCircle,
  AlertCircle,
  Phone,
  Mail
} from 'lucide-react';

export default function ReturnsPage()
 {

  const returnProcess = [
    {
      step: 1,
      title: 'Contact Customer Support',
      description: 'Contact Diarayao Outlet within 7 days of delivery to request a return or exchange. Provide order number, customer name, contact number, reason for return, and product pictures/videos if required.',
    },
    {
      step: 2,
      title: 'Return Request Review',
      description: 'Our team will review your request and confirm whether the product qualifies for return or exchange. Approval decisions are usually provided within 24–48 hours.',
    },
    {
      step: 3,
      title: 'Ship the Product',
      description: 'Once approved, pack the product securely, keep all tags and packaging intact, and send the item through the provided return instructions.',
    },
    {
      step: 4,
      title: 'Product Inspection',
      description: 'After receiving the returned item, our quality team will inspect the product. If it meets our return conditions, your refund or exchange will be processed.',
    },
    {
      step: 5,
      title: 'Receive Refund or Exchange',
      description: 'Approved refunds are completed within 5–7 Business Days. Exchange items will be shipped after approval and availability confirmation.',
    },
  ];

  return (
    <>
      <Header />
      <main className="min-h-screen">
        <div className="bg-gradient-to-br from-pink-700 to-rose-700 text-white py-12 md:py-16">
          <div className="container mx-auto px-4">
            <h1 className="text-2xl md:text-4xl font-bold mb-4">Returns & Refunds</h1>
            <p className="text-lg md:text-xl text-pink-100">A simple and customer-friendly return and exchange policy for a confident shopping experience.</p>
          </div>
        </div>

        <div className="container mx-auto px-4 py-12">
          {/* Introduction */}
          <Card className="mb-12">
            <CardContent className="p-6">
              <p className="text-gray-700 leading-relaxed">
                At Diarayao Outlet, customer satisfaction is our priority. We want you to love your abaya and modest fashion products. If you receive a damaged, defective, incorrect, or unsuitable item, we are here to help.
              </p>
            </CardContent>
          </Card>

          {/* Return Policy Summary */}
          <div className="mb-12">
            <h2 className="text-xl md:text-2xl font-bold mb-6">Return Policy Summary</h2>
            <div className="space-y-4">
              <Card>
                <CardContent className="p-4 md:p-6">
                  <div className="flex items-start space-x-3">
                    <Clock className="h-5 w-5 md:h-6 md:w-6 text-pink-600 mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold mb-2 text-sm md:text-base">🔄 7-Day Return & Exchange Window</h3>
                      <p className="text-muted-foreground mb-2 text-sm">
                        You can request a return or exchange within 7 days of receiving your order if:
                      </p>
                      <ul className="text-xs md:text-sm text-muted-foreground space-y-1 list-disc list-inside">
                        <li>Product is damaged or defective</li>
                        <li>Wrong product is delivered</li>
                        <li>Product received is different from the description</li>
                        <li>Size exchange is required (subject to availability)</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 md:p-6">
                  <div className="flex items-start space-x-3">
                    <Shield className="h-5 w-5 md:h-6 md:w-6 text-pink-600 mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold mb-2 text-sm md:text-base">📦 Original Condition Required</h3>
                      <p className="text-muted-foreground mb-2 text-sm">
                        To be eligible for a return or exchange:
                      </p>
                      <ul className="text-xs md:text-sm text-muted-foreground space-y-1 list-disc list-inside">
                        <li>Product must be unused and unworn</li>
                        <li>Original tags must be attached</li>
                        <li>Product packaging must be included</li>
                        <li>Item must be free from stains, damage, perfume smell, or alterations</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 md:p-6">
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="h-5 w-5 md:h-6 md:w-6 text-pink-600 mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold mb-2 text-sm md:text-base">💰 Refund Policy</h3>
                      <p className="text-muted-foreground mb-2 text-sm">
                        For approved returns:
                      </p>
                      <ul className="text-xs md:text-sm text-muted-foreground space-y-1 list-disc list-inside">
                        <li>Refunds will be processed after product inspection.</li>
                        <li>Refund processing time is 5–7 business days after approval.</li>
                        <li>Refund method depends on the original payment method.</li>
                      </ul>
                      <p className="text-xs md:text-sm text-muted-foreground mt-2">
                        For Cash on Delivery orders, refunds may be processed through bank transfer, EasyPaisa, or JazzCash.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Return Process */}
          <div className="mb-12">
            <h2 className="text-xl md:text-2xl font-bold mb-6">How to Return Your Order</h2>
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
              {returnProcess.map((step) => (
                <Card key={step.step}>
                  <CardContent className="p-4 md:p-6 text-center">
                    <div className="w-10 h-10 md:w-12 md:h-12 bg-pink-600 text-white rounded-full flex items-center justify-center mx-auto mb-3 md:mb-4 text-lg md:text-xl font-bold">
                      {step.step}
                    </div>
                    <h3 className="font-semibold mb-2 text-sm md:text-base">{step.title}</h3>
                    <p className="text-xs md:text-sm text-muted-foreground">{step.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Non-Returnable Items */}
          <div className="mb-12">
            <h2 className="text-xl md:text-2xl font-bold mb-6">Non-Returnable Items</h2>
            <Card className="bg-red-50 border-red-200">
              <CardContent className="p-4 md:p-6">
                <div className="flex items-start space-x-3">
                  <AlertCircle className="h-5 w-5 md:h-6 md:w-6 text-red-600 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold mb-2 text-red-900 text-sm md:text-base">The following items cannot be returned or exchanged:</h3>
                    <ul className="text-xs md:text-sm text-red-700 space-y-1">
                      <li>❌ Used, worn, or washed abayas and clothing items</li>
                      <li>❌ Products without original tags or packaging</li>
                      <li>❌ Items damaged due to misuse, washing, or improper handling</li>
                      <li>❌ Customized or specially made products</li>
                      <li>❌ Items altered according to customer request</li>
                      <li>❌ Clearance, sale, or final-discount products</li>
                      <li>❌ Personal hygiene items (if applicable)</li>
                      <li>❌ Returns requested after the 7-day return period</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Size Exchange Policy */}
          <div className="mb-12">
            <h2 className="text-xl md:text-2xl font-bold mb-6">Size Exchange Policy</h2>
            <Card>
              <CardContent className="p-4 md:p-6">
                <p className="text-muted-foreground mb-4 text-sm">
                  We understand choosing the perfect size online can be difficult.
                </p>
                <p className="text-muted-foreground mb-2 text-sm">
                  Size exchanges are available if:
                </p>
                <ul className="text-xs md:text-sm text-muted-foreground space-y-1 list-disc list-inside mb-4">
                  <li>✅ Request is made within 7 days</li>
                  <li>✅ Product is unused</li>
                  <li>✅ Required size is available in stock</li>
                </ul>
                <p className="text-xs md:text-sm text-muted-foreground">
                  Customers are responsible for providing correct measurements before ordering.
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Damaged or Wrong Product */}
          <div className="mb-12">
            <h2 className="text-xl md:text-2xl font-bold mb-6">Damaged or Wrong Product Received</h2>
            <Card className="bg-pink-50 border-pink-200">
              <CardContent className="p-4 md:p-6">
                <p className="text-muted-foreground mb-2 text-sm">
                  If you receive:
                </p>
                <ul className="text-xs md:text-sm text-muted-foreground space-y-1 list-disc list-inside mb-4">
                  <li>Damaged product</li>
                  <li>Wrong design</li>
                  <li>Wrong size/color due to our mistake</li>
                </ul>
                <p className="text-xs md:text-sm text-muted-foreground">
                  Please contact us within 48 hours with clear pictures or video proof. We will arrange a suitable solution as soon as possible.
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Return Shipping Charges */}
          <div className="mb-12">
            <h2 className="text-xl md:text-2xl font-bold mb-6">Return Shipping Charges</h2>
            <Card>
              <CardContent className="p-4 md:p-6">
                <ul className="text-xs md:text-sm text-muted-foreground space-y-2">
                  <li>• If the return is due to our mistake (wrong/damaged product), Diarayao Outlet will handle the solution.</li>
                  <li>• For size changes or personal preference returns, shipping charges may apply.</li>
                </ul>
              </CardContent>
            </Card>
          </div>

          {/* Contact Support */}
          <Card className="bg-pink-50 border-pink-200">
            <CardContent className="p-4 md:p-6">
              <div className="flex items-start space-x-3 mb-4">
                <RefreshCw className="h-5 w-5 md:h-6 md:w-6 text-pink-600 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold mb-2 text-pink-900 text-sm md:text-base">Need Help?</h3>
                  <p className="text-xs md:text-sm text-pink-700">
                    If you have any questions about our return policy or need assistance with your return, our support team is here to help.
                  </p>
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <Mail className="h-4 w-4 md:h-5 md:w-5 text-pink-600 flex-shrink-0" />
                  <span className="text-xs md:text-sm text-gray-700 break-all">diarayaoutlet@gmail.com</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Phone className="h-4 w-4 md:h-5 md:w-5 text-pink-600 flex-shrink-0" />
                  <span className="text-xs md:text-sm text-gray-700">+92 371 3193031</span>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4 mt-4">
                <Button variant="outline" onClick={() => window.location.href = '/contact'} className="w-full sm:w-auto">
                  Contact Support
                </Button>
                <Button variant="outline" onClick={() => window.location.href = '/account'} className="w-full sm:w-auto">
                  View My Orders
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </>
  );
}
