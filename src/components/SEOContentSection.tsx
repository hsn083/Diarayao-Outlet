'use client';

import { useState } from 'react';
import { Check, ChevronDown, ChevronUp } from 'lucide-react';

export default function SEOContentSection() {
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
      question: "Do you offer international shipping?",
      answer: "Currently, we focus on serving customers within Pakistan to ensure the fastest delivery times and best service. We're exploring international shipping options for the future. Please subscribe to our newsletter for updates on international shipping availability."
    },
    {
      question: "How can I track my order?",
      answer: "Once your order is shipped, you'll receive a tracking number via email and SMS. You can use this number to track your order on our website's 'Track Order' page or contact our customer service team for real-time updates on your delivery status."
    },
    {
      question: "What payment methods do you accept?",
      answer: "We accept multiple payment methods including Cash on Delivery (COD), bank transfers, credit/debit cards, and popular digital wallets like JazzCash, EasyPaisa, and SadaPay. All online payments are secured with industry-standard encryption."
    }
  ];

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-20 mb-20">
      <div className="bg-white rounded-2xl p-6 sm:p-8 md:p-12 lg:p-16 overflow-hidden">
        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6 sm:mb-8 leading-tight break-words">
          Premium Islamic Modest Wear in Pakistan | Abayas, Hijabs & Modest Dresses from Diarayao Outlet
        </h2>

        <div className={`overflow-hidden transition-all duration-500 ease-in-out ${isExpanded ? 'max-h-none' : 'max-h-[400px]'}`}>
          <div className="space-y-6 sm:space-y-8 text-gray-700 leading-relaxed text-sm sm:text-base md:text-lg">
            <p className="text-sm sm:text-base md:text-lg">
              The vision of Diarayao Outlet was clear from the very start: it is possible to combine modesty and style in one fashionable clothing. At Diarayao Outlet, we offer abayas and hijabs that are not only attractive but comfortable too, allowing you to wear your beliefs and fashionable preferences at the same time.
            </p>

            <p className="text-sm sm:text-base md:text-lg">
              Whether you are looking for a daily black abaya or want a special abaya for Eid or a wedding party, all garments offered by Diarayao will help you look elegant and feel comfortable and yourself.
            </p>

            <p className="text-sm sm:text-base md:text-lg">
              Come and visit our site to see what makes Diarayao Outlet the best modest fashion shop in Pakistan.
            </p>

            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mt-8 sm:mt-12 mb-4">
              Premium Abayas, Comfortable to Wear and Look Good
            </h2>

            <p className="text-sm sm:text-base md:text-lg">
              As we know, an abaya is not just an outfit, but also something you will be wearing throughout the day, it needs to have the right texture.
            </p>

            <p className="text-sm sm:text-base md:text-lg">
              That is why we use premium Arabic and Turkish-style fabrics in our abayas to offer you soft texture, elegant looks, and great feel whenever you will wear it to go out on errands or to any party.
            </p>

            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mt-8 sm:mt-12 mb-4">
              Fancy and Simple Abaya Designs for All Women
            </h2>

            <p className="text-sm sm:text-base md:text-lg">
              But not every day calls for the same abaya, and we understand that.
            </p>

            <p className="text-sm sm:text-base md:text-lg">
              Our line of abayas includes everything from sleek, simple designs in classic black and neutral colors to fancy designs with detailing, such as embroidery and intricate cuts for days when you need something a little more special.
            </p>

            <p className="text-sm sm:text-base md:text-lg">
              Whatever your style, whatever your occasion, we have an abaya for you.
            </p>

            <p className="text-sm sm:text-base md:text-lg">
              We are constantly introducing new pieces for our repeat customers so they always find something fresh.
            </p>

            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mt-8 sm:mt-12 mb-4">
              Hijabs To Perfect Your Outfit
            </h2>

            <p className="text-sm sm:text-base md:text-lg">
              Your perfect abaya deserves a perfectly matching hijab.
            </p>

            <p className="text-sm sm:text-base md:text-lg">
              Our hijab collection includes chiffon, jersey, and lawn hijabs in beautiful colors and elegant styles to complement every abaya.
            </p>

            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mt-8 sm:mt-12 mb-4">
              Comfortable Prayer Wear
            </h2>

            <p className="text-sm sm:text-base md:text-lg">
              Our prayer wear is crafted from lightweight, breathable fabrics that provide comfort and ease during every prayer.
            </p>

            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mt-8 sm:mt-12 mb-4">
              What to Expect at Diarayao Outlet?
            </h2>

            <ul className="space-y-3 mt-6">
              <li className="flex items-start gap-3 text-sm sm:text-base md:text-lg">
                <Check className="h-5 w-5 sm:h-6 sm:w-6 text-emerald-600 flex-shrink-0 mt-1" />
                <span>Premium Arabic & Turkish inspired fabrics</span>
              </li>
              <li className="flex items-start gap-3 text-sm sm:text-base md:text-lg">
                <Check className="h-5 w-5 sm:h-6 sm:w-6 text-emerald-600 flex-shrink-0 mt-1" />
                <span>Excellent stitching & finishing</span>
              </li>
              <li className="flex items-start gap-3 text-sm sm:text-base md:text-lg">
                <Check className="h-5 w-5 sm:h-6 sm:w-6 text-emerald-600 flex-shrink-0 mt-1" />
                <span>Elegant modern modest designs</span>
              </li>
              <li className="flex items-start gap-3 text-sm sm:text-base md:text-lg">
                <Check className="h-5 w-5 sm:h-6 sm:w-6 text-emerald-600 flex-shrink-0 mt-1" />
                <span>New arrivals regularly</span>
              </li>
              <li className="flex items-start gap-3 text-sm sm:text-base md:text-lg">
                <Check className="h-5 w-5 sm:h-6 sm:w-6 text-emerald-600 flex-shrink-0 mt-1" />
                <span>Nationwide delivery across Pakistan</span>
              </li>
            </ul>

            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mt-8 sm:mt-12 mb-4">
              Simple & Reliable Online Shopping
            </h2>

            <p className="text-sm sm:text-base md:text-lg">
              Shopping at Diarayao Outlet is simple, secure, and convenient. Browse our collection of abayas, hijabs, and prayer wear from anywhere in Pakistan and have them delivered directly to your doorstep.
            </p>

            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mt-8 sm:mt-12 mb-4">
              Covered With Class & Confidence
            </h2>

            <p className="text-sm sm:text-base md:text-lg">
              Every woman deserves to feel elegant, comfortable, and confident. Diarayao Outlet helps you embrace modest fashion with premium quality and timeless style.
            </p>

            {/* FAQ Section */}
            <div className="mt-12 sm:mt-16 pt-8 sm:pt-12 border-t border-gray-200">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-6 sm:mb-8">
                Frequently Asked Questions
              </h2>
              
              <div className="space-y-4">
                {faqs.map((faq, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg overflow-hidden">
                    <button
                      onClick={() => toggleFaq(index)}
                      className="w-full px-4 sm:px-6 py-4 sm:py-5 text-left flex items-center justify-between bg-gray-50 hover:bg-gray-100 transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-inset"
                      aria-expanded={openFaq === index}
                      aria-controls={`faq-answer-${index}`}
                    >
                      <span className="font-semibold text-gray-900 text-sm sm:text-base md:text-lg pr-4">
                        {faq.question}
                      </span>
                      {openFaq === index ? (
                        <ChevronUp className="h-5 w-5 text-emerald-600 flex-shrink-0" />
                      ) : (
                        <ChevronDown className="h-5 w-5 text-emerald-600 flex-shrink-0" />
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
            </div>
          </div>
        </div>

        <button
          onClick={toggleExpanded}
          className="mt-6 sm:mt-8 flex items-center gap-2 text-emerald-600 hover:text-emerald-700 font-semibold text-sm sm:text-base md:text-lg transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 rounded-lg px-3 sm:px-4 py-2"
          aria-expanded={isExpanded}
          aria-controls="seo-content"
        >
          {isExpanded ? (
            <>
              Show Less
              <ChevronUp className="h-4 w-4 sm:h-5 sm:w-5" />
            </>
          ) : (
            <>
              Read More
              <ChevronDown className="h-4 w-4 sm:h-5 sm:w-5" />
            </>
          )}
        </button>
      </div>
    </section>
  );
}
