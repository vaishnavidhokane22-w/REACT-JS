import { useState } from "react";
import Navbar from "../Comman/Navbar";
import Footer from "../Comman/Footer";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function Register() {
  const navigate = useNavigate();

  const [user_name, setName] = useState("");
  const [user_email, setEmail] = useState("");
  const [user_mobile, setmobile] = useState("");
  const [user_password, setPassword] = useState("");

  function handleRegister(e) {
    e.preventDefault();

    const obj = {
      user_name,
      user_email,
      user_mobile,
      user_password,
    };

    axios
      .post("https://a2zithub.org/dairy/abi/user_register", obj)
      .then((res) => {
        console.log("Register Response", res.data);
        alert("Registration Successful! Please login.");
        navigate("/login");
      })
      .catch((err) => {
        console.log("Error:", err.response?.data || err.message);
        alert("Registration failed! Please try again.");
      });
  }

  return (
    <>
      <Navbar />

      <section className="min-h-screen bg-gray-100 flex items-center justify-center px-4 py-10">
        <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-lg">
          <h1 className="text-3xl font-bold text-center text-blue-600 mb-2">
            Create New Account
          </h1>

          <form className="space-y-5" onSubmit={handleRegister}>
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                User Name
              </label>
              <input
                onChange={(e) => setName(e.target.value)}
                type="text"
                name="user_name"
                placeholder="Enter your name"
                className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Mobile Number
              </label>
              <input
                onChange={(e) => setmobile(e.target.value)}
                type="tel"
                name="user_mobile"
                placeholder="Enter your mobile number"
                className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Email Address
              </label>
              <input
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                name="user_email"
                placeholder="Enter your email"
                className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Password
              </label>
              <input
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                name="user_password"
                placeholder="Enter your password"
                className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white font-semibold py-3 rounded-lg hover:bg-blue-700 transition duration-300"
            >
              Create Account
            </button>
          </form>

          <p className="text-center text-gray-500 text-sm mt-5">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-blue-600 font-semibold hover:underline"
            >
              Login
            </Link>
          </p>
        </div>
      </section>

      <Footer />
    </>
  );
}

export default Register;