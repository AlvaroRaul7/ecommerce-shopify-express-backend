
# Table of contents
- [Table of contents](#table-of-contents)
  - [Introduction](#introduction)
  - [Installation](#installation)
  - [Installation (Docker way)](#installation-docker-way)
  - [Features](#features)
  - [Usage](#usage)



## Introduction

Backend project for an ecommerce using Shopify Storefront API Graphql integration for syncing products

**Tech Stack**
- Express.js
- Typescript
- Mongoose
- @shopify/shopify-api
- graphql

Database: Mongodb Atlas Free Cluster hosted in AWS




## Installation

1. Enter the project folder
2. Run `npm install` to run all the dependencies
3. Run `npm run start` to run the project in your localhost


## Installation (Docker way)

1. Enter the project folder
2. Enter the command: `chmod +x build_pipeline`
3. That's it! So easy isn't it? :D

Note:(For requests the port mapped is 49160)

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

