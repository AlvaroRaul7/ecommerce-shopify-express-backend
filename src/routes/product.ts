import express from "express";
const productModel = require("../models/product");
const imageModel = require("../models/image");
const variantModel = require("../models/variant");
const router=express.Router()
router.use(express.json())

router.get("/", async (request: any, response: any) => {
    const product = await productModel.find({});
    try {
      response.send(product);
    } catch (error) {
      response.status(500).send(error);
    }
  });


router.get("/:productId", async (request: any, response: any) => {
    console.log(request.params.productId)

    let query_productId= request.params.productId;
    const product = await productModel.find({productId: query_productId });
    try {
      response.send(product);
    } catch (error) {
      response.status(500).send(error);
    }
  });
module.exports = router;