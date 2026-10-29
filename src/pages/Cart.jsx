import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify"; // Toast notifications साठी (जर वापरत असाल तर)

function Cart() {
  const [cart, setCart] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const token = localStorage.getItem("token");

        const response = await axios.post(
          "/dairy/abi/cart_list",
          { token }
        );

        console.log("Cart API Response:", response.data);

        const items = Array.isArray(response.data)
          ? response.data
          : response.data.data;

        setCart(Array.isArray(items) ? items : []);
      } catch (error) {
        console.error(
          "Cart API Error:",
          error.response?.data || error.message
        );
      }
    };

    fetchCart();
  }, []);

  // Quantity वाढवण्यासाठी (+)
  const handleIncreaseQty = (index) => {
    const updatedCart = [...cart];
    const currentQty = updatedCart[index].qty || updatedCart[index].quantity || 1;
    
    if (updatedCart[index].qty !== undefined) {
      updatedCart[index].qty = Number(currentQty) + 1;
    } else {
      updatedCart[index].quantity = Number(currentQty) + 1;
    }
    setCart(updatedCart);
  };

  // Quantity कमी करण्यासाठी (-)
  const handleDecreaseQty = (index) => {
    const updatedCart = [...cart];
    const currentQty = updatedCart[index].qty || updatedCart[index].quantity || 1;

    if (currentQty > 1) {
      if (updatedCart[index].qty !== undefined) {
        updatedCart[index].qty = Number(currentQty) - 1;
      } else {
        updatedCart[index].quantity = Number(currentQty) - 1;
      }
      setCart(updatedCart);
    } else {
      handleRemoveItem(index);
    }
  };

  // ⭐ Product Remove करण्यासाठीचे फंक्शन (Backend API सह)
  const handleRemoveItem = async (item, index) => {
    try {
      const token = localStorage.getItem("token");
      const productId = item.product_id || item.id;

      // जर तुमच्या बॅकएंडमध्ये remove साठी API असेल तर खालीलप्रमाणे कॉल करा:
      // (तुमच्या API चे नाव वेगळे असेल तर ते इथे बदलावे, जसे की /dairy/abi/remove_cart इ.)
      /*
      await axios.post("/dairy/abi/remove_from_cart", {
        token,
        product_id: productId,
      });
      */

      // सध्या युझरच्या स्क्रीनवरून (Local State) आणि LocalStorage मधून काढून टाकण्यासाठी:
      const updatedCart = cart.filter((_, i) => i !== index);
      setCart(updatedCart);

      // LocalStorage मधील cartItems सुद्धा अपडेट करा
      localStorage.setItem("cartItems", JSON.stringify(updatedCart));

      // toast.success("Product removed from cart"); // Toast message हवा असल्यास
      console.log("Product removed successfully");

    } catch (error) {
      console.error("Remove API Error:", error.response?.data || error.message);
      // toast.error("Product remove झाला नाही");
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">My Cart</h2>

      {cart.length === 0 ? (
        <p className="text-gray-500">Your cart is empty.</p>
      ) : (
        <div className="overflow-x-auto shadow-md rounded-lg border border-gray-200 bg-white">
          <table className="min-w-full border-collapse">
            <thead>
              <tr className="bg-gray-100 text-left text-gray-700 uppercase text-sm font-semibold tracking-wider border-b border-gray-200">
                <th className="py-3 px-6 text-center">Sr. No.</th>
                <th className="py-3 px-6 text-center">Product Image</th>
                <th className="py-3 px-6">Product Name</th>
                <th className="py-3 px-6">Price</th>
                <th className="py-3 px-6 text-center">Quantity</th>
                <th className="py-3 px-6 text-center">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 text-gray-600 text-sm">
              {cart.map((item, index) => {
                const currentQty = item.qty || item.quantity || 1;
                const prodId = item.product_id || item.id;

                return (
                  <tr
                    key={item.product_econ_cart_id || prodId || index}
                    className="hover:bg-gray-50 transition"
                  >
                    <td className="py-4 px-6 text-center font-medium text-gray-700">
                      {index + 1}
                    </td>

                    {/* Image वर क्लिक केल्यास Product_det वर जाईल */}
                    <td 
                      className="py-4 px-6 text-center cursor-pointer"
                      onClick={() => navigate(`/product/${prodId}`)}
                    >
                      <img
                        src={item.product_img}
                        alt={item.product_name || "Product"}
                        className="w-16 h-16 object-cover rounded-md mx-auto border border-gray-100 shadow-sm hover:opacity-80 transition"
                      />
                    </td>

                    {/* Name वर क्लिक केल्यास Product_det वर जाईल */}
                    <td 
                      className="py-4 px-6 font-medium text-gray-800 cursor-pointer hover:text-blue-600 transition"
                      onClick={() => navigate(`/product/${prodId}`)}
                    >
                      {item.product_name}
                    </td>

                    <td className="py-4 px-6 text-gray-700 font-semibold">
                      ₹{item.price}
                    </td>

                    {/* Quantity Controls (- / +) */}
                    <td className="py-4 px-6 text-center">
                      <div className="flex items-center justify-center space-x-2">
                        <button
                          onClick={() => handleDecreaseQty(index)}
                          className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold text-lg transition"
                        >
                          -
                        </button>
                        <span className="w-8 text-center font-semibold text-gray-800">
                          {currentQty}
                        </span>
                        <button
                          onClick={() => handleIncreaseQty(index)}
                          className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold text-lg transition"
                        >
                          +
                        </button>
                      </div>
                    </td>

                    {/* Remove Button */}
                    <td className="py-4 px-6 text-center">
                      <button
                        onClick={() => handleRemoveItem(item, index)}
                        className="bg-red-500 hover:bg-red-600 text-white px-3 py-1.5 rounded-md text-xs font-semibold transition shadow-sm"
                      >
                        Remove
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default Cart;