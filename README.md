- [Introduction](#introduction)
  - [Installation](#installation)
  - [Features](#features)
  - [Usage](#usage)



# Introduction

Backend project for an ecommerce using Shopify Storefront API Graphql integration for syncing products.

**Tech Stack**
    - Express.js
    - Typescript
    - Mongoose
    - @shopify/shopify-api
    - graphql
  



## Installation

1.-  Enter the project folder
2.- Run `npm install` to run all the dependencies
3.- Run `npm run start` to run the project in your localhost

## Features

1. Sync the products from the shopify store to the mongo DB, so you must use the shopify
Storefront API (Graphql).
2. PRODUCT endpoints:
- GET ALL (Not paginated) http://localhost:3000/product

- GET ONE http://localhost:3000/product/:productId.

3. CART endpoints:
   
- GET ONE http://localhost:3000/:cartId

- POST http://localhost:3000/cart


- PUT http://your-endpoint/cart


## Usage 

Feel free to open postman and start sending http requests :)

