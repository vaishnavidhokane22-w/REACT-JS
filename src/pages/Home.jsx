
import { useState, useEffect } from "react";
import Navbar from "../Comman/Navbar";
import Footer from "../Comman/Footer";
import ProductCart from "../Comman/ProductCart.jsx";
import Product from "./Product";
import { Link } from "react-router-dom";
import axios from "axios";

function Home() {
  const [current, setCurrent] = useState(0);
  const [slides , setSlides]= useState([])
  const [feature, setFeature]=useState([])

   useEffect(()=>{
    axios.get("https://a2zithub.org/dairy/abi/feature_product").then((res)=>{
      console.log('response',res.data)
      setFeature(res.data)
    })
  })


  useEffect(()=>{
    axios.get("https://a2zithub.org/dairy/abi/slider_det").then((res)=>{
      setSlides(res.data)
    })
  })

 
  
useEffect(() => {
  if (slides.length === 0) return;
  const interval = setInterval(() => {
    setCurrent((prev) => (prev + 1) % slides.length);
  }, 3000);
  return () => clearInterval(interval);
}, [slides.length]);


  const prevSlide = () => {
    setCurrent((prev) => (prev - 1 + images.length) % images.length);
  };

  const nextSlide = () => {
    setCurrent((prev) => (prev + 1) % images.length);
  };

  return (
    <>
      <Navbar />

      <section className="w-full overflow-hidden bg-gray-900">
        <div className="relative h-[300px] w-full sm:h-[450px] lg:h-[600px]">

        {
          slides.length > 0 &&
          <img
            key={current}
           src={slides[current].slider_img}  
            alt={`Slide ${current + 1}`}
            className="h-full w-full object-cover object-center"
          />
         }
        
          {/* Slider Dots */}
          <div className="absolute bottom-5 left-1/2 flex
          -translate-x-1/2 gap-3">
          {slides.map((_, index) => (
              <button key={index}onClick={() => setCurrent(index)}aria-label={`Go to slide ${index + 1}`}
                className={`h-3 w-3 rounded-full transition ${current === index? "scale-125 bg-blue-500":"bg-white"
                }`}
              />
            ))}
          </div>

        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
  <div className="mb-8 flex items-center justify-between">
    <div>
      <h2 className="text-2xl font-bold capitalize text-gray-900 sm:text-3xl">
       Feature_Product
       </h2> 
        <div className="grid grid-cols-2 gap-5 sm:grid-cols-2 lg:grid-cols-4">
     {feature.map((val, index) => (
    <ProductCart key={index} data={val} />
   ))}
</div>

    
    </div>
    <Link to="/product" className="text-sm font-semibold text-indigo-600 hover:text-indigo-800">
      View All →
    </Link>

   
  </div>
 

  <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-4">
    <ProductCart data={{}}/>
  </div>
  
 
  
</section>

   <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
  <div className="mb-8 flex items-center justify-between">
    <div>
      <h2 className="text-2xl font-bold capitalize text-gray-900 sm:text-3xl">
      New Product
      </h2>
    </div>
    <Link to="/product" className="text-sm font-semibold text-indigo-600 hover:text-indigo-800">
      View All →
    </Link>
  </div>
   <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-4">
       <ProductCart data={{}}/>


  </div>
  
  
</section>

   <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
  <div className="mb-8 flex items-center justify-between">
    <div>
      <h2 className="text-2xl font-bold capitalize text-gray-900 sm:text-3xl">
        Best Selling Product
      </h2>
    </div>
    <Link to="/product" className="text-sm font-semibold text-indigo-600 hover:text-indigo-800">
      View All →
    </Link>
  </div>

   <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-4">
       <ProductCart data={{}}/>
    

  </div>
</section>

     

      

      <Footer />
    </>
  );
}

export default Home;