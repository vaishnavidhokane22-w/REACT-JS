import Navbar from "../Comman/Navbar";
import Footer from "../Comman/Footer";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

function Login() {
  const navigation = useNavigate();

  const [user_mobile, setMobile] = useState("");
  const [user_password, setPassword] = useState("");
  const [error, setError] = useState("");

  function LoginUser(e) {
    e.preventDefault();
    var obj = {
      user_mobile,
      user_password,
    };

    axios
      .post("https://a2zithub.org/dairy/abi/user_login", obj)
      .then((res) => {
        console.log("Login Response", res.data);

        if (res.data.status === "success") {
          localStorage.setItem("token", res.data.token);
          // Login zalya war Profile page war redirect karu
          navigation("/profile");
        } else {
          setError("Invalid user mobile & password");
        }
      })
      .catch((err) => {
        console.error("Login Error:", err);
        setError("Something went wrong. Please try again!");
      });
  }

  return (
    <>
      <Navbar />

      <section className="min-h-[70vh] bg-gray-100 flex items-center justify-center px-4 py-5">
        <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-lg">
          <h1 className="text-3xl font-bold text-center text-blue-600 mb-2">
            Login Page
          </h1>

          <p className="text-center text-gray-500 mb-6">
            Welcome back! Please enter your details.
          </p>

          {error && (
            <p className="mb-3 font-bold text-center bg-red-100 p-2 rounded text-red-600">
              {error}
            </p>
          )}

          <form className="space-y-5" onSubmit={LoginUser}>
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Mobile Number
              </label>
              <input
                onChange={(e) => setMobile(e.target.value)}
                type="tel"
                name="user_mobile"
                placeholder="Enter your mobile number"
                className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
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
                className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white font-semibold py-3 rounded-lg hover:bg-blue-700 transition duration-300"
            >
              Login
            </button>
          </form>

          <p className="text-center text-gray-500 mt-5">
            Don't have an account?{" "}
            <Link
              to="/register"
              className="text-blue-600 font-semibold hover:underline"
            >
              Register
            </Link>
          </p>
        </div>
      </section>

      <Footer />
    </>
  );
}

export default Login;