import Navbar from "../Comman/Navbar";
import Footer from "../Comman/Footer";

function Contact() {
  return (
    <>
      <Navbar />

      {/* Hero Header */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-16 px-6 text-center">
        <h1 className="text-4xl sm:text-5xl font-extrabold mb-3">
          Contact Us
        </h1>
        <p className="text-lg max-w-xl mx-auto opacity-90">
          Have questions or feedback? We’d love to hear from you. Get in touch with our team!
        </p>
      </div>

      {/* Main Content Area */}
      <div className="max-w-6xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          
          {/* Left Column: Contact Form & Info */}
          <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
            <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
              <div>
                <input
                  type="text"
                  placeholder="Your Name"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                  required
                />
              </div>

              <div>
                <input
                  type="email"
                  placeholder="Your Email"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                  required
                />
              </div>

              <div>
                <input
                  type="text"
                  placeholder="Your Subject"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                />
              </div>

              <div>
                <textarea
                  rows="4"
                  placeholder="Your Message"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                  required
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition duration-200 shadow-md"
              >
                Send Message
              </button>
            </form>

            {/* Contact Details below the form */}
            <div className="mt-6 pt-6 border-t border-gray-100 space-y-2 text-gray-600 text-sm">
              <p className="flex items-center gap-2">
                ✉️ <span className="font-medium">Email:</span> support@example.com
              </p>
              <p className="flex items-center gap-2">
                📞 <span className="font-medium">Phone:</span> +91 9876543210
              </p>
              <p className="flex items-center gap-2">
                📍 <span className="font-medium">Address:</span> Ahilyanagar, Maharashtra
              </p>
            </div>
          </div>

          {/* Right Column: Embedded Google Map */}
          <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 flex flex-col items-center">
            <div className="w-full h-80 rounded-xl overflow-hidden shadow-inner">
              <iframe
                title="Google Map Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d60312.9242944359!2d74.70889155!3d19.09482815!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bdcb05d46788921%3A0x6677e92c1a5124c6!2sAhmednagar%2C%20Maharashtra!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
            <p className="mt-4 text-gray-500 text-sm font-medium">
              Visit us in Ahilyanagar, Maharashtra.
            </p>
          </div>

        </div>
      </div>

      <Footer />
    </>
  );
}

export default Contact;