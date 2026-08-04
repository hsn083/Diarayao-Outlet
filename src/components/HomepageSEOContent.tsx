'use client';

import { useState } from 'react';
import { Check, ChevronDown, ChevronUp, Truck, Shield, Award, Heart, Zap } from 'lucide-react';

export default function HomepageSEOContent() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const faqs = [
    {
      question: "What makes Diarayao Outlet abayas different from others?",
      answer: "Our abayas are crafted from premium Arabic and Turkish-inspired fabrics, ensuring exceptional comfort, durability, and elegant draping. Each piece features meticulous stitching, modern modest designs, and quality finishing that sets us apart in the Pakistani market."
    },
    {
      question: "Do you deliver across Pakistan?",
      answer: "Yes, we offer fast and reliable nationwide delivery across all cities in Pakistan. Orders are typically processed within 1-2 business days, with delivery times varying by location (usually 3-5 business days for major cities)."
    },
    {
      question: "What is your return and exchange policy?",
      answer: "We offer a hassle-free 7-day return and exchange policy. If you're not satisfied with your purchase, you can return or exchange it within 7 days of delivery, provided the item is in its original condition with tags attached."
    },
    {
      question: "How do I choose the right abaya size?",
      answer: "We provide detailed size charts for each abaya on the product page. Our abayas are designed for a modest, comfortable fit. If you're between sizes, we recommend sizing up for a more relaxed fit. You can also contact our customer service for personalized sizing assistance."
    },
    {
      question: "Are your abayas suitable for all seasons?",
      answer: "Yes, we offer abayas for all seasons. Our lightweight Nida and crepe abayas are perfect for summer, while our thicker fabrics and layered designs provide warmth during winter. We also have all-season options that work year-round in Pakistan's climate."
    },
    {
      question: "What payment methods do you accept?",
      answer: "We accept multiple payment methods including Cash on Delivery (COD), bank transfers, credit/debit cards, and popular digital wallets like JazzCash, EasyPaisa, and SadaPay. All online payments are secured with industry-standard encryption."
    },
    {
      question: "How can I track my order?",
      answer: "Once your order is shipped, you'll receive a tracking number via email and SMS. You can use this number to track your order on our website's 'Track Order' page or contact our customer service team for real-time updates on your delivery status."
    },
    {
      question: "Do you offer international shipping?",
      answer: "Currently, we focus on serving customers within Pakistan to ensure the fastest delivery times and best service. We're exploring international shipping options for the future. Please subscribe to our newsletter for updates on international shipping availability."
    }
  ];

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
      <div className="bg-white rounded-2xl p-6 sm:p-8 md:p-12 lg:p-16 shadow-lg border border-gray-100">
        
        {/* About Diarayao Section */}
        <section className="mb-12 sm:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4 sm:mb-6">
            About Diarayao Outlet - Your Trusted Destination for Premium Abayas in Pakistan
          </h2>
          <div className="space-y-4 text-gray-700 leading-relaxed text-sm sm:text-base md:text-lg">
            <p>
              Diarayao Outlet was founded with a clear vision: to combine modesty and style in one fashionable clothing line. As Pakistan's premier destination for premium Arabian and Turkish abayas, hijabs, and modest fashion, we serve women who value both elegance and comfort in their everyday wear.
            </p>
            <p>
              Our mission is simple yet powerful - to make premium-quality Islamic wear accessible to women across Pakistan without compromising on style, comfort, or affordability. Every abaya in our collection is carefully selected to meet the needs of modern Muslim women who want to express their faith while embracing contemporary fashion trends.
            </p>
            <p>
              Located in Faisalabad, we proudly serve customers nationwide with a commitment to exceptional quality, secure shopping, and reliable delivery. Our growing community of over 1,000 happy customers across Pakistan stands testament to our dedication to customer satisfaction and product excellence.
            </p>
          </div>
        </section>

        {/* Premium Abayas Collection Section */}
        <section className="mb-12 sm:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4 sm:mb-6">
            Premium Abayas Collection - Elegant Modest Fashion for Every Occasion
          </h2>
          <div className="space-y-4 text-gray-700 leading-relaxed text-sm sm:text-base md:text-lg">
            <p>
              Our premium abayas collection features over 300 carefully curated designs, ranging from everyday essentials to luxury pieces for special occasions. Whether you're looking for a classic black abaya for daily wear, an elegant piece for Eid celebrations, or a sophisticated design for wedding parties, our collection has something perfect for every moment in your life.
            </p>
            <p>
              We specialize in Arabic and Turkish-inspired abayas that blend traditional modesty with modern aesthetics. Our collection includes open abayas, kimono abayas, Nida abayas, and fancy designs with intricate embroidery and detailing. Each piece is crafted to help you look elegant and feel confident while staying true to your values.
            </p>
            <p>
              We constantly introduce new pieces for our repeat customers, ensuring you always find something fresh and exciting. Our premium abayas are designed to be versatile - perfect for work, casual outings, formal events, and religious gatherings alike.
            </p>
          </div>
        </section>

        {/* Why Choose Diarayao Section */}
        <section className="mb-12 sm:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4 sm:mb-6">
            Why Choose Diarayao Outlet for Your Modest Fashion Needs?
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            <div className="flex items-start gap-4 p-4 bg-gradient-to-br from-pink-50 to-rose-50 rounded-xl">
              <div className="flex-shrink-0 w-12 h-12 bg-pink-100 rounded-full flex items-center justify-center">
                <Award className="h-6 w-6 text-pink-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Premium Quality</h3>
                <p className="text-sm text-gray-600">Exceptional fabrics and meticulous stitching ensure long-lasting quality.</p>
              </div>
            </div>
            <div className="flex items-start gap-4 p-4 bg-gradient-to-br from-emerald-50 to-teal-50 rounded-xl">
              <div className="flex-shrink-0 w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center">
                <Heart className="h-6 w-6 text-emerald-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Elegant Designs</h3>
                <p className="text-sm text-gray-600">Modern, timeless, and modest styles perfect for every occasion.</p>
              </div>
            </div>
            <div className="flex items-start gap-4 p-4 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl">
              <div className="flex-shrink-0 w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                <Truck className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Fast Delivery</h3>
                <p className="text-sm text-gray-600">Reliable nationwide delivery across Pakistan within 3-5 business days.</p>
              </div>
            </div>
            <div className="flex items-start gap-4 p-4 bg-gradient-to-br from-amber-50 to-orange-50 rounded-xl">
              <div className="flex-shrink-0 w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center">
                <Shield className="h-6 w-6 text-amber-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Secure Shopping</h3>
                <p className="text-sm text-gray-600">Your data and orders are protected with industry-standard security.</p>
              </div>
            </div>
            <div className="flex items-start gap-4 p-4 bg-gradient-to-br from-purple-50 to-violet-50 rounded-xl">
              <div className="flex-shrink-0 w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                <Zap className="h-6 w-6 text-purple-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Easy Returns</h3>
                <p className="text-sm text-gray-600">Hassle-free 7-day return and exchange policy for your peace of mind.</p>
              </div>
            </div>
            <div className="flex items-start gap-4 p-4 bg-gradient-to-br from-rose-50 to-pink-50 rounded-xl">
              <div className="flex-shrink-0 w-12 h-12 bg-rose-100 rounded-full flex items-center justify-center">
                <Check className="h-6 w-6 text-rose-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Customer Support</h3>
                <p className="text-sm text-gray-600">24/7 customer support to assist you with any queries or concerns.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Quality & Craftsmanship Section */}
        <section className="mb-12 sm:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4 sm:mb-6">
            Quality & Craftsmanship - The Diarayao Difference
          </h2>
          <div className="space-y-4 text-gray-700 leading-relaxed text-sm sm:text-base md:text-lg">
            <p>
              At Diarayao Outlet, we believe that an abaya is not just an outfit - it's something you'll wear throughout the day, so it needs to have the right texture, comfort, and durability. That's why we use only premium Arabic and Turkish-style fabrics in our abayas to offer you soft texture, elegant looks, and great feel whether you're running errands or attending special events.
            </p>
            <p>
              Our commitment to quality extends beyond fabrics. Every abaya undergoes rigorous quality checks to ensure excellent stitching, proper finishing, and attention to detail. We work with skilled artisans who understand the nuances of modest fashion and craft each piece with precision and care.
            </p>
            <p>
              From the selection of fabrics to the final inspection, our quality control process ensures that every abaya that reaches you meets our high standards. This dedication to craftsmanship is what makes Diarayao Outlet a trusted name in premium abayas and modest fashion across Pakistan.
            </p>
          </div>
        </section>

        {/* Fast Delivery Section */}
        <section className="mb-12 sm:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4 sm:mb-6">
            Fast Delivery Across Pakistan - Bringing Modest Fashion to Your Doorstep
          </h2>
          <div className="space-y-4 text-gray-700 leading-relaxed text-sm sm:text-base md:text-lg">
            <p>
              Shopping at Diarayao Outlet is simple, secure, and convenient. Browse our collection of premium abayas, hijabs, and modest wear from anywhere in Pakistan and have them delivered directly to your doorstep. Our efficient logistics network ensures that your orders reach you quickly and safely, no matter where you are in the country.
            </p>
            <p>
              We offer multiple delivery options to suit your needs, including standard delivery (3-5 business days for major cities) and express delivery for urgent orders. Our tracking system keeps you informed about your order status every step of the way, giving you peace of mind and control over your delivery.
            </p>
            <p>
              Our delivery partners are experienced in handling delicate fabrics and ensure that your abayas arrive in perfect condition. We also offer Cash on Delivery (COD) for customers who prefer to pay upon receiving their order, making online shopping accessible to everyone across Pakistan.
            </p>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="border-t border-gray-200 pt-8 sm:pt-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-6 sm:mb-8">
            Frequently Asked Questions About Our Premium Abayas
          </h2>
          
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="border border-gray-200 rounded-lg overflow-hidden">
                <button
                  onClick={() => toggleFaq(index)}
                  className="w-full px-4 sm:px-6 py-4 sm:py-5 text-left flex items-center justify-between bg-gray-50 hover:bg-gray-100 transition-colors focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-inset"
                  aria-expanded={openFaq === index}
                  aria-controls={`faq-answer-${index}`}
                >
                  <span className="font-semibold text-gray-900 text-sm sm:text-base md:text-lg pr-4">
                    {faq.question}
                  </span>
                  {openFaq === index ? (
                    <ChevronUp className="h-5 w-5 text-pink-600 flex-shrink-0" />
                  ) : (
                    <ChevronDown className="h-5 w-5 text-pink-600 flex-shrink-0" />
                  )}
                </button>
                {openFaq === index && (
                  <div
                    id={`faq-answer-${index}`}
                    className="px-4 sm:px-6 py-4 sm:py-5 bg-white text-gray-700 text-sm sm:text-base md:text-lg leading-relaxed"
                  >
                    {faq.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Expand/Collapse Button */}
        <button
          onClick={toggleExpanded}
          className="mt-8 sm:mt-10 flex items-center gap-2 text-pink-600 hover:text-pink-700 font-semibold text-sm sm:text-base md:text-lg transition-colors focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2 rounded-lg px-4 sm:px-6 py-3 mx-auto"
          aria-expanded={isExpanded}
          aria-controls="seo-content"
        >
          {isExpanded ? (
            <>
              Show Less Content
              <ChevronUp className="h-4 w-4 sm:h-5 sm:w-5" />
            </>
          ) : (
            <>
              Read More About Diarayao Outlet
              <ChevronDown className="h-4 w-4 sm:h-5 sm:w-5" />
            </>
          )}
        </button>
      </div>
    </section>
  );
}
