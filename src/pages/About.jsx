import React from "react";
import Navbar from "../Comman/Navbar";
import Footer from "../Comman/Footer";
import { Link } from "react-router-dom";

function About() {
  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-white py-10 px-4 sm:px-6 lg:px-8">
        {/* Main Heading */}
        <h1 className="text-3xl sm:text-4xl font-bold text-center text-gray-900 mb-10">
          Welcome To About Page
        </h1>

        {/* Content Box */}
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-center bg-white p-6 rounded-2xl shadow-sm">
          
          {/* Left Side - Image */}
          <div className="flex justify-center">
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSIguRwNvGFvWEwTWcwmp1BepLcMKHDQtoRff2DqVbHWA&s=10"
              alt="Fresh Fruits"
              className="rounded-2xl w-full max-w-md object-cover shadow-md"
            />
          </div>

          {/* Right Side - Details */}
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-gray-900">
              About Our Store
            </h2>
            
            <p className="text-gray-600 leading-relaxed text-sm sm:text-base">
              Welcome to our online shopping store. We offer fresh, high quality 
              fruits and essential products for everyone. Our goal is to provide a great 
              shopping experience with fresh products at affordable prices.
            </p>

            {/* Checklist */}
            <ul className="space-y-2 text-gray-700 font-medium">
              <li className="flex items-center gap-2">
                <span className="text-indigo-600 font-bold">✓</span> Quality Products
              </li>
              <li className="flex items-center gap-2">
                <span className="text-indigo-600 font-bold">✓</span> Affordable Prices
              </li>
              <li className="flex items-center gap-2">
                <span className="text-indigo-600 font-bold">✓</span> Fresh & Organic Items
              </li>
              <li className="flex items-center gap-2">
                <span className="text-indigo-600 font-bold">✓</span> Customer Satisfaction
              </li>
            </ul>

            {/* Shop Now Button */}
            <div className="pt-2">
              <Link to="/product">
                <button className="bg-black hover:bg-gray-800 text-white font-semibold py-2.5 px-6 rounded-lg transition duration-300">
                  Shop Now
                </button>
              </Link>
            </div>
          </div>

        </div>
      </div>

      <Footer />
    </>
  );
}

export default About;