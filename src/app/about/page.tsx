import { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { BreadcrumbSchema } from '@/components/StructuredData';

export const metadata: Metadata = {
  title: 'About Us - Premium Abayas & Modest Fashion | Diarayao Outlet',
  description: 'Learn about Diarayao Outlet - Pakistan\'s premier destination for premium Arabian and Turkish abayas, hijabs, and modest fashion. Our mission is to empower women with elegant, comfortable, and affordable Islamic wear.',
  keywords: 'about Diarayao Outlet, modest fashion Pakistan, abaya store Pakistan, Islamic clothing Pakistan, our story, mission, vision',
  openGraph: {
    title: 'About Us - Premium Abayas & Modest Fashion | Diarayao Outlet',
    description: 'Learn about Diarayao Outlet - Pakistan\'s premier destination for premium Arabian and Turkish abayas, hijabs, and modest fashion.',
    url: 'https://www.diarayao.com/about',
    siteName: 'Diarayao Outlet',
    locale: 'en_PK',
    type: 'website',
    images: [
      {
        url: 'https://www.diarayao.com/pic.jpg',
        width: 1200,
        height: 630,
        alt: 'Diarayao Outlet - About Us',
      }
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'About Us - Premium Abayas & Modest Fashion | Diarayao Outlet',
    description: 'Learn about Diarayao Outlet - Pakistan\'s premier destination for premium Arabian and Turkish abayas, hijabs, and modest fashion.',
    images: ['https://www.diarayao.com/pic.jpg'],
    creator: '@diarayaooutlet',
    site: '@diarayaooutlet',
  },
  alternates: {
    canonical: 'https://www.diarayao.com/about',
  },
};

export default function AboutPage() {
  const breadcrumbItems = [
    { name: 'Home', item: '/' },
    { name: 'About Us', item: '/about' },
  ];

  return (
    <>
      <BreadcrumbSchema items={breadcrumbItems} />
      <Header />

      <main className="min-h-screen bg-gray-50">

        {/* Hero */}
        <section className="bg-gradient-to-r from-pink-700 to-rose-700 text-white py-20">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl font-bold mb-4">
              About Diarayao Outlet
            </h1>

            <p className="text-xl text-pink-100 max-w-2xl mx-auto">
              Your trusted destination for premium Abayas, Hijabs, Khimars, and Modest Fashion in Pakistan.
            </p>
          </div>
        </section>


        {/* Story */}
        <section className="py-16">
          <div className="container mx-auto px-4 max-w-5xl">

            <div className="grid md:grid-cols-2 gap-12 items-center">

              <div>

                <span className="text-sm font-semibold text-pink-600 tracking-widest uppercase">
                  Our Story
                </span>

                <h2 className="text-3xl font-bold mt-2 mb-4 text-gray-900">
                  Elegance, Modesty & Confidence
                </h2>


                <p className="text-gray-600 mb-4 leading-relaxed">
                  Founded with a passion for modest fashion, Diarayao Outlet was created to make premium-quality Islamic wear accessible to women across Pakistan.
                </p>


                <p className="text-gray-600 mb-4 leading-relaxed">
                  We believe that modest fashion is more than clothing�it's a reflection of confidence, elegance, and identity. Our goal is to offer beautifully crafted abayas and modest wear that combine timeless designs, comfort, and exceptional quality at affordable prices.
                </p>


                <p className="text-gray-600 mb-4 leading-relaxed">
                  Every collection is carefully selected to meet the needs of modern Muslim women who value both style and modesty. Whether you're looking for an everyday abaya, a luxury piece for special occasions, or elegant hijabs and modest essentials, Diarayao Outlet is here to help you find the perfect outfit.
                </p>

                <p className="text-gray-600 leading-relaxed">
                  Today, we proudly serve customers across Pakistan with premium products, secure shopping, and reliable nationwide delivery.
                </p>


              </div>



              {/* Mission */}
              <div className="bg-gradient-to-br from-pink-50 to-rose-50 rounded-2xl p-8 text-center">

                <div className="text-6xl mb-4">
                  
                </div>


                <h3 className="text-xl font-bold text-pink-800 mb-3">
                  Our Mission
                </h3>


                <p className="text-gray-600 mb-4">
                  Modest Fashion That Empowers Every Woman
                </p>


                <p className="text-gray-600 mb-4">
                  Our mission is simple:
                </p>


                <ul className="text-gray-600 space-y-2 text-left">
                  <li>? Premium Quality Fabrics</li>
                  <li>? Elegant & Modern Modest Designs</li>
                  <li>? Affordable Prices</li>
                  <li>? Comfortable Everyday Wear</li>
                  <li>? Secure & Hassle-Free Shopping</li>
                  <li>? Fast Nationwide Delivery</li>
                  <li>? Excellent Customer Service</li>
                </ul>

                <p className="text-gray-600 mt-4 text-sm">
                  We strive to make every shopping experience enjoyable while helping women express their style with confidence and grace.
                </p>


              </div>

            </div>

          </div>
        </section>




        {/* Stats */}
        <section className="bg-white py-16">

          <div className="container mx-auto px-4">

            <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">
              Our Growing Community
            </h2>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center max-w-3xl mx-auto">

              {[
                { value: '300+', label: 'Premium Abaya Designs' },
                { value: '1000+', label: 'Happy Customers Across Pakistan' },
                { value: '10+', label: 'Modest Fashion Categories' },
                { value: '24/7', label: 'Customer Support' },
              ].map((stat) => (

                <div key={stat.label}>

                  <div className="text-3xl font-bold text-pink-700">
                    {stat.value}
                  </div>

                  <div className="text-sm text-gray-500 mt-1">
                    {stat.label}
                  </div>

                </div>

              ))}

            </div>

          </div>

        </section>




        {/* Why Choose Us */}
        <section className="py-16 bg-gray-50">

          <div className="container mx-auto px-4 max-w-5xl">


            <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">
              Why Choose Diarayao Outlet?
            </h2>



            <div className="grid md:grid-cols-3 gap-6">


              {[
                {
                  icon: '✨',
                  title: 'Premium Quality',
                  desc: 'Every abaya is carefully selected and inspected to ensure exceptional stitching, comfort, and long-lasting quality.'
                },

                {
                  icon: '🌙',
                  title: 'Elegant Designs',
                  desc: 'Discover modern, timeless, and modest styles perfect for everyday wear, work, events, and special occasions.'
                },

                {
                  icon: '🚚',
                  title: 'Fast Nationwide Delivery',
                  desc: 'We deliver safely and quickly to customers all across Pakistan.'
                },

                {
                  icon: '🔄',
                  title: 'Easy Returns & Exchanges',
                  desc: 'Shop with confidence through our simple 7-day return and exchange policy.'
                },

                {
                  icon: '🔒',
                  title: 'Secure Shopping',
                  desc: 'Your personal information and orders are protected with secure systems and trusted payment methods.'
                },

                {
                  icon: '💖',
                  title: 'Customer Satisfaction First',
                  desc: 'Your satisfaction is our highest priority. We are committed to providing excellent service before and after every purchase.'
                }

              ].map((item) => (

                <div
                  key={item.title}
                  className="bg-white rounded-xl p-6 text-center border border-pink-100 hover:shadow-md transition"
                >

                  <div className="text-4xl mb-3">
                    {item.icon}
                  </div>


                  <h3 className="font-semibold text-gray-800 mb-2">
                    {item.title}
                  </h3>


                  <p className="text-sm text-gray-500">
                    {item.desc}
                  </p>


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
