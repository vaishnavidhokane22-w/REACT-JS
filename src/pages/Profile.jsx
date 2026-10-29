import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "../Comman/Navbar";
import Footer from "../Comman/Footer";

function Profile() {
  const [profile, setProfile] = useState({});
  const navigation = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");

    // Token nathil tar direct Login Page la pathva
    if (!token) {
      navigation("/login");
      return;
    }

    const obj = { token: token };

    axios
      .post("https://a2zithub.org/dairy/abi/user_profile", obj)
      .then((res) => {
        console.log("Profile Response", res.data);
        if (res.data && res.data.data && res.data.data.length > 0) {
          setProfile(res.data.data[0]);
        }
      })
      .catch((err) => {
        console.error("Profile Fetch Error:", err);
      });
  }, [navigation]);

  function Logout() {
    localStorage.clear();
    navigation("/login");
  }

  return (
    <>
      <Navbar />

      <section className="min-h-screen bg-gray-100 px-4 py-10">
        <div className="mx-auto max-w-3xl">
          <div className="overflow-hidden rounded-2xl border bg-white shadow-lg">
            <div className="h-32 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600"></div>

            <div className="px-6 pb-8 sm:px-10">
              <div className="flex flex-col items-center gap-4 border-b py-6 sm:flex-row">
                <img
                  src={
                    profile.profile ||
                    "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150"
                  }
                  alt="Profile"
                  className="-mt-12 h-28 w-28 rounded-full border-4 border-white object-cover shadow-md bg-gray-200"
                  onError={(e) => {
                    e.currentTarget.src =
                      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150";
                  }}
                />

                <div className="flex-1 text-center sm:mt-4 sm:text-left">
                  <h2 className="text-2xl font-bold text-gray-800">
                    {profile.user_name || "User Name"}
                  </h2>

                  <p className="mt-1 text-sm text-gray-500">
                    Full-Stack Developer
                  </p>

                  <span className="mt-2 inline-block rounded-full bg-green-50 px-3 py-1 text-xs font-semibold text-green-600">
                    ● Active Account
                  </span>

                  <div className="mt-4 flex flex-wrap justify-center gap-3 sm:justify-start">
                    <button
                      type="button"
                      className="rounded-xl bg-blue-600 px-5 py-2 font-semibold text-white hover:bg-blue-700"
                    >
                      Edit Profile
                    </button>

                    <button
                      type="button"
                      onClick={Logout}
                      className="rounded-xl bg-red-600 px-5 py-2 font-semibold text-white hover:bg-red-700"
                    >
                      Logout
                    </button>
                  </div>
                </div>
              </div>

              <div className="border-b py-6">
                <h3 className="mb-5 text-lg font-bold text-gray-800">
                  Personal Information
                </h3>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div className="rounded-xl bg-gray-50 p-4">
                    <p className="text-xs text-gray-500">Full Name</p>
                    <p className="mt-2 font-semibold text-gray-800">
                      {profile.user_name || "N/A"}
                    </p>
                  </div>

                  <div className="rounded-xl bg-gray-50 p-4">
                    <p className="text-xs text-gray-500">Email Address</p>
                    <p className="mt-2 break-all font-semibold text-gray-800">
                      {profile.user_email || "N/A"}
                    </p>
                  </div>

                  <div className="rounded-xl bg-gray-50 p-4">
                    <p className="text-xs text-gray-500">Mobile Number</p>
                    <p className="mt-2 font-semibold text-gray-800">
                      +91 {profile.user_mobile || "N/A"}
                    </p>
                  </div>

                  <div className="rounded-xl bg-gray-50 p-4">
                    <p className="text-xs text-gray-500">Password</p>
                    <p className="mt-2 font-semibold text-gray-800">
                      {profile.user_password || "••••••••"}
                    </p>
                  </div>
                </div>
              </div>

              <div className="py-6">
                <h3 className="mb-4 text-lg font-bold text-gray-800">
                  Account Settings
                </h3>

                <div className="space-y-3">
                  <button
                    type="button"
                    className="flex w-full items-center justify-between rounded-xl border p-4 hover:border-blue-400 hover:bg-blue-50"
                  >
                    <span className="font-semibold text-gray-800">
                      Order History
                    </span>
                    <span className="text-xl text-gray-400">&rarr;</span>
                  </button>

                  <button
                    type="button"
                    className="flex w-full items-center justify-between rounded-xl border p-4 hover:border-blue-400 hover:bg-blue-50"
                  >
                    <span className="font-semibold text-gray-800">
                      Liked Products
                    </span>
                    <span className="text-xl text-gray-400">&rarr;</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}

export default Profile;