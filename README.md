# CampusStore - E-Commerce Web Application

**Student Name:** Yash Hitesh Ganatra  
**Roll No:** 24BIT148  
**Course:** Web Technology (24IC301T)

## About the Project

CampusStore is a front-end e-commerce web application built using React.js and JavaScript (ES6). The idea behind this project is a simple online store for college students to buy reference textbooks, calculators, stationery, and lab accessories.

I built this project to practically implement the concepts from our Web Technology syllabus, including responsive layout design, JavaScript array manipulation, regular expression form validation, and state management in React.

## Features

- **Product Catalog & Filtering:** Browse items by category (Books, Electronics, Stationery, Accessories), filter by maximum price slider, sort by price or rating, and search by keyword.
- **Shopping Cart:** Add items, update quantities, remove items, and view automatic bill calculations with free delivery above Rs. 999.
- **Wishlist:** Save items for later using the heart button on any product card.
- **Bulk Order Calculator:** A quick estimator for study groups or lab batches to check bulk discounts (6% off on 5+ units, 12% off on 10+ units, plus a 5% college ID rebate).
- **Checkout & Regex Validation:** Validates customer details (name, email, 10-digit mobile number, 6-digit pincode) and promo codes (`STUDENT10` and `WEBTECH20`) using JavaScript Regular Expressions.
- **Local Storage Persistence:** Cart items, wishlist, and placed order receipts are saved in `localStorage` so data stays intact on page refresh.

## Syllabus Concepts Used

1. **HTML & CSS (Units 1 & 2):** Semantic layout (`header`, `main`, `section`, `footer`, tables, and forms) styled with responsive utility classes.
2. **Modern JavaScript & ES6 (Unit 3):**
   - `let` and `const`, arrow functions, template literals, and object/array destructuring.
   - Array methods: `.filter()`, `.map()`, `.reduce()`, `.find()`, and `.sort()`.
   - Regular Expressions (`RegExp`) for validating checkout inputs and discount codes.
3. **React.js (Unit 4):**
   - Functional components (`App`, `ProductCard`, `CheckoutView`, `ProductVisual`) and a Class Component (`BulkEstimator` using `this.state` and `this.setState`).
   - React Hooks: `useState`, `useEffect`, `useReducer`, `useContext`, and `useCallback`.
   - Passing data and event handlers via props.

## Project Structure

```text
├── index.html
├── package.json
├── vite.config.js
└── src/
    ├── main.jsx
    ├── App.jsx
    ├── index.css
    ├── context/
    │   └── ShopContext.jsx
    ├── data/
    │   └── products.js
    └── components/
        ├── BulkEstimator.jsx
        ├── CheckoutView.jsx
        ├── ProductCard.jsx
        └── ProductVisual.jsx
```

## How to Run Locally

1. Clone the repository:
   ```bash
   git clone https://github.com/YashG2009/ECommerce.git
   cd ECommerce
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open `http://localhost:3000` in your browser.
