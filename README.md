## Description

Main St. Coffee is an e-commerce site for coffee lovers. The site offers variety of coffees, coffee makers and accessories.

## Features

- Customers can search for specific types of coffees or coffee makers using the search bar.
- Add each item to their shopping cart, and when they ready they can checkout by clicking on the shopping cart icon.
- Customers can also register and have an account. This feature allows the user to see their purchase history.
- The site has a secure checkout methode via Stripe API

# API

The site utilizes Stripe API for processing customer payments

# User Flow

- User can view all the products on the Products page
- Products can be added to the shopping cart from the Products page. Also, the user can select the item and then add the item to the shopping cart
- Users have the option to create an account or log into an existing account
- When the customer is ready, they can go to the checkout page by selecting the cart icon in the top right corner
- Customers that have an account, can update their profile and also view their prior purchases.

## How to run the application

1- Navigate to the frontend folder and install dependencies

- cd frontend
- npm install

2- Navigate to the backend folder

- cd frontend
- npm install

3- To run the server, run nodemon server.js command in the backend folder

4- In a new termnial, navigate to the frontend folder and run npm start

## Tech Stack

- Front-end: React.js, Tailwind CSS
- Back-end: Node.js
- Database: PostgreSQL
- API: Stripe API
