import express from "express";
const productModel = require("../models/product");
const router=express.Router()
router.use(express.json())
const cartModel = require("../models/cart");
router.get("/", async (request: any, response: any) => {
    const cart = await cartModel.find({});
    try {
      response.send(cart);
    } catch (error) {
      response.status(500).send(error);
    }
  });

router.get("/:cartId", async (request: any, response: any) => {
    // console.log(request.params.cartId)

    let query_cartId= request.params.cartId;
    const cart = await cartModel.find({id: query_cartId });
    try {
      response.send(cart);
    } catch (error) {
      response.status(500).send(error);
    }
  });

router.post("/", async (request: any, response: any) => {

    const cart_item = request.body.lineItems;
    console.log(cart_item);
    const product_arr: any = [];
    for(let i=0; i< cart_item.length; i++){
        const product_id = cart_item[i].product;
        console.log(product_id);
        const product = await productModel.findById(product_id);
        console.log(product);
        product_arr.push(product);

       
    }
    try {
        response.send(product_arr);
      } catch (error) {
        response.status(500).send(error);
    }   
  });

router.put("/", async (request: any, response: any) =>{
    const cart = request.body;
    console.log(cart);
    const query_cart = await cartModel.findById(cart.id);
    console.log(query_cart);
    query_cart.lineItems=cart.lineItems;

    // const new_cart = await cartModel(cart);
    try{
        await query_cart.save();
        response.status(200).send("OK");
    }catch(error){
        response.status(500).send(error);
    }


});

module.exports = router;