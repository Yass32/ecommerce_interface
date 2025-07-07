import { useEffect, useRef, useState } from 'react'
import Rating from './components/Rating';
import Loading from 'react-simple-loading';
import { GrNext, GrPrevious } from "react-icons/gr";
import './App.css'
import axios from 'axios';

function App() {
  // State to track the selected color for each product (by index)
  const [selectedColors, setSelectedColors] = useState({});
  // State to track loading status while fetching products
  const [loading, setLoading] = useState(false);
  // State to store the list of products fetched from the backend
  const [products, setProducts] = useState([]);
  // State to store the selected price range for filtering products
  const [priceRange, setPriceRange] = useState([0, 50000]); 

  // Reference to the scrollable product list container (for scrolling left/right)
  const scrollRef = useRef(null);

  // Fetch products from the backend API when the component mounts
  useEffect(() => {
    setLoading(true); // Show loading spinner
    const fetchProducts = async () => {
      try {
        // Make GET request to backend API to fetch products
        const response = await axios.get('http://localhost:3000/api/products');
        setProducts(response.data); // Store products in state
      }
      catch (error) {
        // Log any errors that occur during fetch
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false); // Hide loading spinner
      }
    }
    fetchProducts();
  }, []);

  // Handler to update the selected color for a specific product
  const handleColorSelect = (index, color) => {
    setSelectedColors(prev => ({ ...prev, [index]: color }));
  };

  // Filter products based on the selected price range
  const filteredProducts = products.filter(product =>
    product.price >= priceRange[0] && product.price <= priceRange[1]
  );

  return (
    <>
      <div className="bg-white h-screen">
        <div className="px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
          {/* Page title */}
          <h2 className="font-avenir className='font-montserrat text-[45px] ">Product List</h2>
          
          {/* Price range filter controls */}
          <div className="flex items-center gap-4 mb-6">
            <label className="font-montserrat">Min Price:</label>
            <input
              type="number"
              value={priceRange[0]}
              min={0}
              max={priceRange[1]}
              onChange={e => setPriceRange([Number(e.target.value), priceRange[1]])}
              className="border rounded px-2 py-1 w-24"
            />
            <label className="font-montserrat">Max Price:</label>
            <input
              type="number"
              value={priceRange[1]}
              min={priceRange[0]}
              onChange={e => setPriceRange([priceRange[0], Number(e.target.value)])}
              className="border rounded px-2 py-1 w-24"
            />
          </div>

          {/* Product list and navigation arrows */}
          {loading ? (
            // Show loading spinner while products are being fetched
            <Loading stroke={'10px'} size={'100px'} />
          ) : (
            <div className='flex items-center space-x-2 justify-between'>
              {/* Scroll left arrow */}
              <GrPrevious size={50} onClick={() => scrollRef.current?.scrollBy({ left: -300, behavior: 'smooth' })}
                className="hover:scale-125 transition delay-100 duration-300 ease-in-out"/>
              
              {/* Scrollable product cards container */}
              <div ref={scrollRef} className="mt-8 flex flex-nowrap overflow-x-scroll gap-x-12"> 
                {filteredProducts.length === 0 ? (
                  // Show message if no products match the price filter
                  <p className="text-center text-gray-500">No products found in this price range.</p>
                ) : (
                  // Render each filtered product card
                  filteredProducts.map((product, index) => (
                    <div key={index+1} className="w-64 flex-shrink-0 p-4">
                      {/* Product image changes based on selected color */}
                      <img
                        alt={product.name}
                        src={
                          (selectedColors[index] || "Yellow Gold") === "Yellow Gold"
                            ? product.images.yellow
                            : (selectedColors[index] || "Yellow Gold") === "White Gold"
                            ? product.images.white
                            : product.images.rose
                        }
                        className="aspect-square rounded-xl  object-cover hover:opacity-75 transition-opacity duration-300 ease-in-out"
                      />
                      <div className="mt-4 text-left">
                        {/* Product name */}
                        <p className='font-montserrat font-medium text-[15px]'>{product.name}</p>
                        {/* Product price */}
                        <p className='font-montserrat text-[15px]'>${product.price}</p>
                        {/* Color selection circles */}
                        <div className='mt-2 flex flex-row gap-x-2'>
                          {/* Yellow Gold */}
                          <div
                            className={`w-4 h-4 rounded-full bg-[#E6CA97] cursor-pointer ${selectedColors[index] === "Yellow Gold" || (!selectedColors[index] && "Yellow Gold" === "Yellow Gold") ? "outline-1 outline-offset-2 outline-black" : ""}`}
                            onClick={() => handleColorSelect(index, "Yellow Gold")}
                          />
                          {/* White Gold */}
                          <div
                            className={`w-4 h-4 rounded-full bg-[#D9D9D9] cursor-pointer ${selectedColors[index] === "White Gold" ? "outline-1 outline-offset-2 outline-black" : ""}`}
                            onClick={() => handleColorSelect(index, "White Gold")}
                          />
                          {/* Rose Gold */}
                          <div
                            className={`w-4 h-4 rounded-full bg-[#E1A4A9] cursor-pointer ${selectedColors[index] === "Rose Gold" ? "outline-1 outline-offset-2 outline-black" : ""}`}
                            onClick={() => handleColorSelect(index, "Rose Gold")}
                          />
                        </div>
                        {/* Show selected color name */}
                        <p className="mt-1 font-avenir text-[12px]">{selectedColors[index] || "Yellow Gold"}</p> 
                        {/* Product rating */}
                        <div className='flex items-center'>
                          <Rating newRating={product.rating || 3.0} />
                          <p className="font-avenir text-[14px] ml-2">{product.rating || 3}/5</p>
                        </div>   
                      </div>
                    </div>
                  ))
                )}
              </div>
              {/* Scroll right arrow */}
              <GrNext size={50} onClick={() => scrollRef.current?.scrollBy({ left: 300, behavior: 'smooth' })}
                className="hover:scale-125 transition delay-100 duration-300 ease-in-out"/>
            </div>
          )}
        </div>
      </div>
    </>
  )
}

export default App
