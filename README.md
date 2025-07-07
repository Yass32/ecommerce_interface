# Ecommerce Interface

This project is a full-stack ecommerce product interface that allows users to browse, filter, and interact with a list of jewelry products. It features a React frontend and a Node.js/Express backend, with live gold price integration and custom UI features.

---

## Features

- **Product Listing:** Browse a scrollable list of jewelry products with images, prices, and ratings.
- **Color Selection:** Select a color (Yellow Gold, White Gold, Rose Gold) for each product and see the image update accordingly.
- **Price Range Filter:** Filter products by a selectable price range.
- **Live Gold Price:** Product prices are dynamically calculated based on the current gold price.
- **Loading State:** User-friendly loading spinner while fetching products.
- **Responsive UI:** Modern, responsive design using Tailwind CSS.
- **Custom Fonts:** Uses Montserrat and Avenir fonts for a premium look.
- **Star Ratings:** Visual star ratings for each product.

---

## Tech Stack

- **Frontend:** React, Tailwind CSS, Axios, React Icons
- **Backend:** Node.js, Express, dotenv, cors
- **Other:** Custom fonts, JSON data, live gold price service

---

## Getting Started

### Prerequisites

- Node.js (v16 or higher recommended)
- npm

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/yourusername/ecommerce_interface.git
   cd ecommerce_interface
   ```

2. **Install backend dependencies:**
   ```bash
   cd backend
   npm install
   ```

3. **Install frontend dependencies:**
   ```bash
   cd ../frontend
   npm install
   ```

---

## Running the Application

### 1. Start the Backend Server

```bash
cd backend
npm start
```
- The backend will run on [http://localhost:3000](http://localhost:3000)
- It serves product data and calculates prices using the current gold price.

### 2. Start the Frontend Development Server

```bash
cd ../frontend
npm run dev
```
- The frontend will run on [http://localhost:5173](http://localhost:5173)
- Open this URL in your browser to use the app.

---

## Project Structure

```
ecommerce_interface/
│
├── backend/
│   ├── server.js
│   ├── products.json
│   └── services/
│       └── getGoldPrice.js
│
├── frontend/
│   ├── src/
│   │   ├── App.jsx
│   │   ├── components/
│   │   │   └── Rating.jsx
│   │   ├── fonts.css
│   │   └── ...
│   ├── public/
│   │   └── fonts/
│   ├── tailwind.config.js
│   └── ...
│
└── README.md
```

---

## Customization

- **Add/Update Products:**  
  Edit `backend/products.json` to add or modify products. Each product should have `name`, `images`, `popularityScore`, and `weight`.

- **Change Gold Price Source:**  
  Update `backend/services/getGoldPrice.js` if you want to use a different gold price API.

- **Fonts:**  
  Place your custom font files in `frontend/public/fonts/` and update `frontend/src/fonts.css` as needed.

---

## Troubleshooting

- **CORS Issues:**  
  Make sure the backend is running on port 3000 and the frontend on 5173. The backend is configured to allow requests from the frontend.

- **Fonts Not Loading:**  
  Ensure font files are in the correct location and `fonts.css` is imported in your main entry file.

- **API Errors:**  
  Check the backend console for errors if products are not loading.

---

## License

This project is for educational/demo purposes.  
You may use and modify it as you wish.

---

## Credits

- [React](https://react.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Express](https://expressjs.com/)
- [React Icons](https://react-icons.github.io/react-icons/)