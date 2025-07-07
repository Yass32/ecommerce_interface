// Import required modules
import getGoldPrice from './services/getGoldPrice.js'; // Function to fetch the current gold price
import cors from 'cors'; // Middleware to enable Cross-Origin Resource Sharing
import dotenv from 'dotenv'; // Loads environment variables from a .env file
import express from 'express'; // Web framework for Node.js
import fs from 'fs'; // File system module to read files

dotenv.config(); // Load environment variables from .env file

const app = express(); // Create an Express application

const PORT = process.env.PORT || 3000; // Set the server port from environment or default to 3000

// Middleware to parse JSON bodies in incoming requests
app.use(express.json());

// Enable CORS to allow requests from the frontend (localhost:5173)
app.use(cors({
    origin: "http://localhost:5173", // Only allow requests from this origin
    methods: ["GET", "POST", "PUT", "DELETE"], // Allow these HTTP methods
    credentials: true, // Allow credentials such as cookies or authorization headers
    allowedHeaders: "Content-Type" // Only allow Content-Type header
}))

// Function to get the list of products with calculated prices and ratings
const getProducts = async () => {
      // Read products data from products.json file
      const data = fs.readFileSync('./products.json', 'utf-8');
      const products = JSON.parse(data);

      // Get the current gold price (async call)
      const goldPrice = await getGoldPrice();

      // Map over each product to calculate price and rating
      const productList = products.map(product => ({
            name: product.name, // Product name
            // Calculate price based on popularityScore, weight, and gold price, rounded to 2 decimals
            price: Math.round(((product.popularityScore + 1) * product.weight * goldPrice) * 100) / 100,
            images: product.images, // Product images (object with color keys)
            // Calculate rating (scale popularityScore to 0-5, rounded to 1 decimal)
            rating: Math.round(product.popularityScore * 5 * 10) / 10,
      }));
      return productList; // Return the processed product list
};

// API route to get all products
app.get('/api/products', async (request, response) => {
      const products = await getProducts(); // Fetch processed products
      return response.status(200).json(products); // Send products as JSON response
});

// Start the server and listen on the specified port
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});