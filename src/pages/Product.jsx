import Navbar from "../Comman/Navbar";
import Footer from "../Comman/Footer";
import ProductCart from "../Comman/ProductCart";
import axios from "axios";
import { useEffect, useState } from "react";

function Product() {
  const [product, setProduct] = useState([]);

  useEffect(() => {
    axios.get("https://a2zithub.org/dairy/abi/product_det").then((res) => {
      console.log("response", res.data);
      setProduct(res.data);
    });
  }, []);

  return (
    <>
      <Navbar />

      <div className="container mx-auto px-5 mt-10">
        <h1 className="text-3xl font-bold text-center mb-8">Welcome To Product Page</h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {product.map((val, index) => (
            // Ithe key prop direct ProductCart la dili ahe (database madhli unique id vaprun)
            <ProductCart key={val.product_tbl_id || index} data={val} />
          ))}
        </div>
      </div>

      <Footer />
    </>
  );
}

export default Product;