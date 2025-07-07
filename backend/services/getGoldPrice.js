import axios from 'axios'; 
import dotenv from 'dotenv'; 

dotenv.config(); 
const API_URL = process.env.API_URL;

const getGoldPrice = async (request, response) => {
      try {
            const response = await axios.get(API_URL);             
            const goldPrice = response.data.price;
            console.log("Gold price fetched successfully:", goldPrice);
            return goldPrice;
      }
      catch (error) {
            console.error("Error fetching gold price:", error);
            return;
      }
}
export default getGoldPrice;