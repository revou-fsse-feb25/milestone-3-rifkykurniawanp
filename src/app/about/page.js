import React from 'react';
import FAQ from '@/components/FAQ';


const AboutPage = () => {
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-200">
      {/* <Navigation /> */}
      <div className="max-w-4xl mx-auto p-8">
        <div className="mb-8 border-b-2 pb-2">
          {/* <BackButton /> */}
        </div>
        <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200 py-16 px-6 flex flex-col items-center">
      <h1 className="text-5xl font-bold mb-6">About Revo Shop</h1>
      <p className="max-w-3xl text-lg mb-8 text-center">
        Revo Shop is your trusted online shopping destination, offering a wide range of high-quality products at the best prices.
        Our goal is to make online shopping safe, fast, and enjoyable for customers across the globe.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl w-full text-center">
        <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold mb-2">Our Vision</h3>
          <p>To revolutionize the online shopping experience by making it seamless, secure, and accessible to everyone.</p>
        </div>
        <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold mb-2">Our Mission</h3>
          <p>To deliver exceptional service, fast shipping, and a curated selection of products that customers love and trust.</p>
        </div>
        <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold mb-2">Our Values</h3>
          <p>We believe in honesty, innovation, customer satisfaction, and continuous improvement in everything we do.</p>
        </div>
      </div>

      <p className="mt-12 text-center max-w-2xl text-gray-600 dark:text-gray-400">
        Thank you for choosing Revo Shop. We’re committed to providing you with the best online shopping experience—today and always.

        If you have any questions or feedback, feel free to <a href="/contact" className="text-blue-500 hover:underline">contact us</a>.
        <br />
      </p>
        <p className="text-center text-gray-500 dark:text-gray-400 mt-4">
          © {new Date().getFullYear()} Revo Shop. All rights reserved.
        </p>
        <br />
      <FAQ />
        
    </div>
      </div>

    </div>
  );
};

export default AboutPage;
