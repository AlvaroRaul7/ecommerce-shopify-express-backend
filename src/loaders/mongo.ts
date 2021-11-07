const express = require("express");
const mongoose: any = require("mongoose");

const username = "mongo";
const password = "mongo";
const cluster = "mercado593.pz1or";
const dbname = "ecommerce";
const uri = "mongodb+srv://mongo:<password>@mercado593.pz1or.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

MongoConnection().catch(err => console.log(err));

export async function MongoConnection() {
  await mongoose.connect( `mongodb+srv://${username}:${password}@${cluster}.mongodb.net/${dbname}?retryWrites=true&w=majority`,
  {
   
  }
);
}

