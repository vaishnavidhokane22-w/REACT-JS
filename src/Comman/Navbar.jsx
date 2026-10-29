import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

        {/* Logo */}
        <div>
          <h1 className="text-2xl font-bold text-blue-600">SHOPING</h1>
        </div>

        {/* Navigation Links */}
        <div className="hidden md:flex items-center gap-8">
          <Link to="/" className="text-gray-700 hover:text-blue-600 transition">Home</Link>
          <Link to="/about" className="text-gray-700 hover:text-blue-600 transition">About</Link>
          <Link to="/product" className="text-gray-700 hover:text-blue-600 transition">Product</Link>
          <Link to="/contact" className="text-gray-700 hover:text-blue-600 transition">Contact</Link>
        </div>

        {/* Authentication Buttons (Fixed with Link) */}
        <div className="flex items-center gap-3">
          <Link 
            to="/login" 
            className="px-4 py-2 text-blue-600 font-medium hover:text-blue-800 transition"
          >
            Login
          </Link>
          
          <Link 
            to="/register" 
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            Register
          </Link>
        </div>

      </div>
    </nav>
  );
}

export default Navbar;