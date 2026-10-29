import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../pages/CartContext";

function ProductCart({ data }) {
  const { addToCart } = useCart();
  const [successMsg, setSuccessMsg] = useState("");

  const handleAdd = () => {
    addToCart(data);
    setSuccessMsg("Product added successfully!");
    setTimeout(() => {
      setSuccessMsg("");
    }, 2500);
  };

  return (
    <div className="relative flex flex-col justify-between overflow-hidden rounded-2xl border bg-white p-4 shadow-md hover:shadow-xl transition duration-300">
      
      {/* Green Success Popup */}
      {successMsg && (
        <div className="absolute top-2 left-1/2 -translate-x-1/2 z-25 rounded-lg bg-green-600 px-3 py-1 text-xs font-semibold text-white shadow-md">
          ✓ {successMsg}
        </div>
      )}

      <div>
        <img
          src={data.product_img}
          alt={data.product_name}
          className="h-48 w-full rounded-xl object-cover bg-gray-50"
          onError={(e) => {
            e.currentTarget.src = "https://via.placeholder.com/150?text=No+Image";
          }}
        />

        <div className="mt-4">
          <h2 className="text-lg font-bold text-gray-800">
            {data.product_name}
          </h2>
          <p className="mt-1 text-xl font-bold text-blue-600">
            ₹{data.price}
          </p>
        </div>
      </div>

      {/* Buttons */}
      <div className="mt-5 flex flex-col gap-2">
        <button
          type="button"
          onClick={handleAdd}
          className="w-full rounded-xl bg-green-600 py-2.5 font-semibold text-white shadow hover:bg-green-700 transition"
        >
          Add to Cart
        </button>

        <Link
          to={`/Product_det/${data.product_tbl_id}`}
          className="w-full text-center rounded-xl border border-blue-600 bg-white py-2.5 font-semibold text-blue-600 hover:bg-blue-50 transition"
        >
          View Details
        </Link>
      </div>

    </div>
  );
}

export default ProductCart;