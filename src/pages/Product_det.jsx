import Navbar from "../Comman/Navbar";
import Footer from "../Comman/Footer";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Product_det() {
  const { product_id } = useParams();
  const navigate = useNavigate();

  const [product_det, setProduct_det] = useState({});
  const [adding, setAdding] = useState(false);

  const fetchProduct = async () => {
    try {
      const obj = {
        product_id: product_id,
        token: localStorage.getItem("token"),
      };

      const res = await axios.post("/dairy/abi/product_by_id", obj);
      console.log("Product response:", res.data);

      const prodData = res.data.data || res.data;
      setProduct_det(prodData);
    } catch (err) {
      console.error(
        "Error fetching product details:",
        err.response?.data || err.message
      );
      toast.error("Product details load झाले नाहीत");
    }
  };

  useEffect(() => {
    fetchProduct();
  }, [product_id]);

  const addToCart = async () => {
    if (adding) return;
    setAdding(true);

    try {
      const cartObj = {
        product_id: product_id,
        token: localStorage.getItem("token"),
      };

      const res = await axios.post("/dairy/abi/addtocart", cartObj);
      console.log("Cart API response:", res.data);
      
      toast.success("Product added to cart!");

      // ⭐ Add to Cart केल्यावर लगेच लोकल स्टेट 'yes' करा जेणेकरून बटण त्वरित बदलेल
      setProduct_det((prev) => ({
        ...prev,
        cart: "yes",
      }));

    } catch (apiError) {
      console.error(
        "Add to cart API error:",
        apiError.response?.data || apiError.message
      );
      toast.error("Product cart मध्ये add झाला नाही");
    } finally {
      setAdding(false);
    }
  };

  return (
    <>
      <Navbar />

      <ToastContainer position="top-right" autoClose={2000} />

      <section className="min-h-screen bg-gray-50 px-4 py-8">
        <h1 className="mb-8 text-center text-4xl font-bold text-gray-900">
          Product Details - {product_id}
        </h1>

        <div className="mx-auto grid max-w-5xl grid-cols-1 items-center gap-8 rounded-xl bg-white p-6 shadow-md md:grid-cols-2">
          <div className="overflow-hidden rounded-lg bg-gray-100">
            <img
              src={product_det?.product_img}
              alt={product_det?.product_name || "Product"}
              className="h-96 w-full object-cover"
              onError={(e) => {
                e.currentTarget.onerror = null;
                e.currentTarget.src =
                  "https://placehold.co/300x300?text=No+Image";
              }}
            />
          </div>

          <div>
            <span className="inline-block rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-700">
              In Stock
            </span>

            <p className="mb-4 text-3xl font-bold text-gray-900">
              {product_det?.product_name || "Loading..."}
            </p>

            <p className="mt-4 text-2xl font-bold text-indigo-600">
              ₹{product_det?.price || 0}
            </p>

            <h2 className="mt-2 text-lg text-gray-600">
              {product_det?.details ||
                product_det?.description ||
                ""}
            </h2>

           
            {product_det?.cart === "yes" ? (
              <button
                type="button"
                onClick={() => navigate("/Cart")}
                className="mt-6 w-full rounded-lg bg-green-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700 shadow-sm"
              >
                Go to Cart
              </button>
            ) : (
              <button
                type="button"
                onClick={addToCart}
                disabled={adding || !product_det?.product_name}
                className="mt-6 w-full rounded-lg bg-indigo-600 px-6 py-3 font-semibold text-white transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {adding ? "Adding..." : "Add to Cart"}
              </button>
            )}

            {/* Cart Status Text */}
            <div className="mt-3 text-center">
              {product_det?.cart === "yes" ? (
                <p className="text-xs font-medium text-green-600">
                  Cart already present
                </p>
              ) : (
                <p className="text-xs font-medium text-gray-500">
                  Cart is not found
                </p>
              )}
            </div>

          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}

export default Product_det;