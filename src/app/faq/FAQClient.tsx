'use client';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useSettingsStore } from '@/store/settingsStore';
import { BreadcrumbSchema } from '@/components/StructuredData';

// FAQ Schema Component
function FAQSchema({ faqs }: { faqs: Array<{ q: string; a: string }> }) {
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.a,
      },
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
    />
  );
}

const faqs = [
  {
    q: 'What is Diarayao Outlet?',
    a: "Diarayao Outlet is a Pakistani online fashion store specializing in premium abayas, modest wear, hijabs, khimars, and elegant Islamic fashion. We are committed to providing high-quality products, affordable prices, and fast nationwide delivery.",
  },
  {
    q: 'Do you offer Cash on Delivery (COD)?',
    a: "Yes! We offer Cash on Delivery (COD) across most cities in Pakistan. We also accept EasyPaisa and JazzCash. For advance payments via EasyPaisa or JazzCash, a payment screenshot is required for order verification.",
  },
  {
    q: 'How long does delivery take?',
    a: "Estimated delivery times are: Major Cities: 2–5 Business Days, Remote Areas: 4–7 Business Days. Delivery times may vary during sales, holidays, or due to courier delays.",
  },
  {
    q: 'What is your return and exchange policy?',
    a: "We offer a 7-day return and exchange policy. To qualify, the item must be unused and unwashed, include original tags and packaging, and be returned within 7 days of delivery. Please contact our customer support before returning any item.",
  },
  {
    q: 'Are your abayas made from premium quality fabric?',
    a: "Yes. Every abaya at Diarayao Outlet is carefully selected using quality fabrics that offer comfort, elegance, and durability. Each product is inspected before dispatch to ensure excellent quality.",
  },
  {
    q: 'How do I choose the correct size?',
    a: "Each product includes a size guide to help you select the right fit. If you're unsure about sizing, our customer support team is happy to assist you before placing your order.",
  },
  {
    q: 'Do you deliver across Pakistan?',
    a: "Yes! We deliver nationwide, including all major cities and many remote areas throughout Pakistan.",
  },
  {
    q: 'Can I exchange my abaya for a different size or color?',
    a: "Yes. Size or color exchanges are available within 7 days, subject to stock availability. Please contact our customer support team before sending the product back.",
  },
  {
    q: 'How can I track my order?',
    a: "Once your order has been shipped, you will receive your tracking number via SMS, WhatsApp, or email (where applicable). You can also contact our support team to get the latest status of your order.",
  },
  {
    q: 'How can I contact Diarayao Outlet?',
    a: "We're always happy to help. Email: diarayaoutlet@gmail.com, Phone / WhatsApp: +92 371 3193031. Our support team is available during business hours to assist with orders, sizing, exchanges, deliveries, and general inquiries.",
  },
  {
    q: 'Are the product colors exactly the same as shown in the pictures?',
    a: "We make every effort to display our products as accurately as possible. However, slight color differences may occur due to lighting during photography and individual device screen settings.",
  },
  {
    q: 'Can I cancel my order?',
    a: "Yes. You may request to cancel your order before it has been shipped. Once the order has been dispatched, cancellation may no longer be possible.",
  },
  {
    q: 'Is my personal information secure?',
    a: "Absolutely. Your privacy is important to us. We use secure practices to protect your personal information and never sell or share your data with unauthorized third parties. Please refer to our Privacy Policy for more details.",
  },
];

export default function FAQClient() {
  const general = useSettingsStore(state => state.settings.general);

  const breadcrumbItems = [
    { name: 'Home', item: '/' },
    { name: 'FAQ', item: '/faq' },
  ];

  return (
    <>
      <BreadcrumbSchema items={breadcrumbItems} />
      <FAQSchema faqs={faqs} />
      <Header />
      <main className="min-h-screen bg-gray-50">
        <section className="bg-gradient-to-r from-pink-700 to-rose-700 text-white py-16">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl font-bold mb-4">Frequently Asked Questions</h1>
            <p className="text-xl text-pink-100">Everything you need to know about shopping at Diarayao Outlet</p>
          </div>
        </section>

        <section className="py-16">
          <div className="container mx-auto px-4 max-w-3xl">
            <div className="space-y-4">
              {faqs.map((faq, i) => (
                <div key={i} className="bg-white rounded-xl border border-gray-100 p-6 hover:shadow-md transition-shadow">
                  <h3 className="font-semibold text-gray-900 mb-2 flex items-start gap-2">
                    <span className="text-pink-600 font-bold">Q.</span>
                    {faq.q}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed pl-5">{faq.a}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
