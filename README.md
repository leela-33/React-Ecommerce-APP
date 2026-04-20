🛒 React Ecommerce App (Nxt Trendz Clone)

A fully functional React-based Ecommerce application inspired by Nxt Trendz, featuring:

🔐 JWT Authentication

🛍 Product Listing with Filters

🔎 Search Functionality

⭐ Rating Filters

📦 Product Details Page

🛒 Add to Cart

🧺 Cart Page showing added items

🔄 Protected Routes with JWT

---

🚀 Live Demo

(https://nxtz.ccbp.tech/login)
---
🔐 Login Details (For Testing)

Use the following credentials to log in:

Username: rahul
Password: rahul@2021

---

📂 Project Structure
src/
 ├── components/
 │   ├── LoginForm/
 │   ├── Home/
 │   ├── Header/
 │   ├── Products/
 │   ├── AllProductsSection/
 │   ├── FiltersGroup/
 │   ├── ProductCard/
 │   ├── ProductItemDetails/
 │   ├── SimilarProductItem/
 │   ├── PrimeDealsSection/
 │   ├── Cart/
 │   └── NotFound/
 │
 ├── context/
 │   └── CartContext.js
 │
 ├── App.js
 ├── index.js
 ├── App.css
 └── index.css
---
✨ Features
🔐 Authentication

Secure login using username & password

JWT token stored in cookies

Access to pages only after login

🛍 Product Listing

Browse all products

Filter by category

Filter by rating

Search by product title

Sort by price (High → Low / Low → High)

📄 Product Details View

Shows full product information

Rating & reviews

Increase/decrease quantity

Add to Cart option

🛒 Cart System

Items added from product page appear in the cart

Shows:

Product Image

Title

Brand

Price

Quantity

Cart image hidden when items exist
---
🧰 Tech Stack

React JS

React Router DOM

Context API

js-cookie

REST API integration

CSS Flexbox & Responsive Layout
---
🔗 APIs Used

Base URL:

https://apis.ccbp.in/

Feature	API
Login	/login
Get Products	/products
Product Details	/products/:id
Prime Deals	/prime-deals


🤝 Contributing

Pull requests are welcome!
Feel free to open an issue for feature requests or bug fixes.
---
📜 License

This project is open-source and free to use.
> ### _Things to Keep in Mind_
>
> - All components you implement should go in the `src/components` directory.
> - Don't change the component folder names as those are the files being imported into the tests.
> - **Do not remove the pre-filled code**
> - Want to quickly review some of the concepts you’ve been learning? Take a look at the Cheat Sheets.
