'use client';

import { useState } from 'react';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BreadcrumbSchema } from '@/components/StructuredData';
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock,
  Send,
  MessageSquare,
  Loader2,
  CheckCircle,
  AlertCircle
} from 'lucide-react';
import { useSettingsStore } from '@/store/settingsStore';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact Us - Diarayao Outlet',
  description: 'Contact Diarayao Outlet for any questions about our premium abayas, hijabs, and modest fashion. Reach us via phone, email, WhatsApp, or visit our store in Faisalabad, Pakistan.',
  keywords: 'contact Diarayao Outlet, customer support, abaya store contact, Pakistan fashion store contact, WhatsApp support',
  openGraph: {
    title: 'Contact Us - Diarayao Outlet',
    description: 'Contact Diarayao Outlet for any questions about our premium abayas, hijabs, and modest fashion.',
    url: 'https://www.diarayao.com/contact',
    siteName: 'Diarayao Outlet',
    locale: 'en_PK',
    type: 'website',
    images: [
      {
        url: '/Logo.jpeg',
        width: 1200,
        height: 630,
        alt: 'Diarayao Outlet - Contact Us',
      }
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Contact Us - Diarayao Outlet',
    description: 'Contact Diarayao Outlet for any questions about our premium abayas, hijabs, and modest fashion.',
    images: ['/Logo.jpeg'],
    creator: '@diarayaooutlet',
    site: '@diarayaooutlet',
  },
  alternates: {
    canonical: 'https://www.diarayao.com/contact',
  },
};

export default function ContactPage() {
  const general = useSettingsStore(state => state.settings.general);
  const socialMedia = useSettingsStore(state => state.settings.socialMedia);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const breadcrumbItems = [
    { name: 'Home', item: '/' },
    { name: 'Contact Us', item: '/contact' },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess(false);
    setIsLoading(true);

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (data.success) {
        setSuccess(true);
        setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
      } else {
        setError(data.error || 'Failed to send message. Please try again.');
      }
    } catch (err) {
      setError('Network error. Please check your connection and try again.');
    } finally {
      setIsLoading(false);
    }
  };

  // Parse address from settings
  const addressLines = general.companyAddress ? general.companyAddress.split(',').map(s => s.trim()) : ['DIARAYAO OUTLET', 'Faisalabad', 'Pakistan'];

  const contactInfo = [
    {
      icon: MapPin,
      title: 'Address',
      details: addressLines,
    },
    {
      icon: Phone,
      title: 'Phone',
      details: [
        <a key="phone" href="tel:+923713193031" className="hover:text-emerald-600 transition-colors">+923713193031</a>
      ],
    },
    {
      icon: Mail,
      title: 'Email',
      details: [
        <a key="email" href="mailto:diarayaoutlet@gmail.com" className="hover:text-emerald-600 transition-colors">diarayaoutlet@gmail.com</a>
      ],
    },
    {
      icon: Clock,
      title: 'Business Hours',
      details: ['Monday – Saturday | 10:00 AM – 8:00 PM (PKT)'],
    },
  ];

  return (
    <>
      <BreadcrumbSchema items={breadcrumbItems} />
      <Header />
      <main className="min-h-screen">
        <div className="bg-gradient-to-br from-emerald-600 to-teal-600 text-white py-16">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl font-bold mb-4">Contact Us</h1>
            <p className="text-xl text-white/90">We'd love to hear from you</p>
          </div>
        </div>

        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <Card>
              <CardHeader>
                <CardTitle>Send us a Message</CardTitle>
              </CardHeader>
              <CardContent>
                {/* Success Message */}
                {success && (
                  <div className="mb-6 p-4 bg-emerald-50 border border-emerald-200 rounded-xl flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-emerald-600 flex-shrink-0" />
                    <p className="text-emerald-700">Your message has been sent successfully. We will get back to you soon!</p>
                  </div>
                )}

                {/* Error Message */}
                {error && (
                  <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl flex items-center gap-3">
                    <AlertCircle className="h-5 w-5 text-red-600 flex-shrink-0" />
                    <p className="text-red-700">{error}</p>
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <Label htmlFor="name">Full Name *</Label>
                    <Input
                      id="name"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      disabled={isLoading}
                    />
                  </div>
                  <div>
                    <Label htmlFor="email">Email *</Label>
                    <Input
                      id="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      disabled={isLoading}
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="+923xxxxxxxx"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      disabled={isLoading}
                    />
                  </div>
                  <div>
                    <Label htmlFor="subject">Subject *</Label>
                    <Input
                      id="subject"
                      required
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      disabled={isLoading}
                    />
                  </div>
                  <div>
                    <Label htmlFor="message">Message *</Label>
                    <textarea
                      id="message"
                      required
                      rows={5}
                      className="flex min-h-[120px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      disabled={isLoading}
                    />
                  </div>
                  <Button type="submit" className="w-full bg-emerald-600 hover:bg-emerald-700" disabled={isLoading}>
                    {isLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send className="mr-2 h-4 w-4" />
                        Send Message
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Contact Information */}
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {contactInfo.map((info, index) => (
                  <Card key={index}>
                    <CardContent className="p-6">
                      <div className="flex items-start space-x-3">
                        <info.icon className="h-6 w-6 text-primary mt-1" />
                        <div>
                          <h3 className="font-semibold mb-2">{info.title}</h3>
                          {info.details.map((detail, i) => (
                            <p key={i} className="text-sm text-muted-foreground">{detail}</p>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* WhatsApp */}
              {socialMedia.whatsapp.enabled && socialMedia.whatsapp.url && (
                <Card className="bg-green-50 border-green-200">
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-3">
                      <MessageSquare className="h-8 w-8 text-green-600" />
                      <div>
                        <h3 className="font-semibold text-green-900">Chat with us on WhatsApp</h3>
                        <p className="text-sm text-green-700">
                          Quick responses for instant support
                        </p>
                      </div>
                    </div>
                    <a
                      href="https://api.whatsapp.com/send/?phone=923713193031&text&type=phone_number&app_absent=0"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block"
                    >
                      <Button className="w-full mt-4 bg-green-600 hover:bg-green-700">
                        <MessageSquare className="mr-2 h-4 w-4" />
                        Chat on WhatsApp
                      </Button>
                    </a>
                  </CardContent>
                </Card>
              )}

              

              {/* FAQ Link */}
              <Card>
                <CardContent className="p-6">
                  <h3 className="font-semibold mb-2">Have questions?</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Check our FAQ section for quick answers to common questions.
                  </p>
                  <Link href="/faq">
                    <Button variant="outline" className="w-full cursor-pointer hover:bg-emerald-50 hover:text-emerald-700 hover:border-emerald-300 focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2">
                      View FAQ
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
