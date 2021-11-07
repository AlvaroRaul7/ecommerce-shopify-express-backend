import express, { Application, Request, Response } from "express";
import axios from 'axios';
import cookie from 'cookie';
import crypto, { KeyObject } from 'crypto';
import querystring from 'query-string';
import Shopify, {DataType} from '@shopify/shopify-api';
import { GraphQLClient } from "graphql-request";
// Importing express module
const productModel = require("../models/product");
const router=express.Router()
const fs = require('fs');

const api_url = 'https://mercado593.myshopify.com/api/2021-10/graphql.json'

const request_storefront = async(data: any) => await axios(api_url,{
    method:'POST',
    data,
    headers: {
        'X-Shopify-Access-Token': `${process.env.STOREFRONT_ACCESSTOKEN}`
      }
});

const client = new GraphQLClient(api_url, {
    headers: { 'X-Shopify-Storefront-Access-Token': `${process.env.STOREFRONT_ACCESSTOKEN}` },
  });
export let data: any;

// Handling request using router
router.get("/",async (req,res,next)=>{
	
    const query = `{
        products(first:20) {
          edges {
            node {
              id
              title
              tags
              vendor
              productType
              handle
              description
              totalInventory
             
              
              images(first: 2){
                  edges{
                      node{
                          width
                          height
                          id
                          src
                          altText
                          
                      }
                       
                  }
              }
              
              variants(first:3){
                  edges{
                      node{
                          title
                          price
                          weight
                         
                      }
                  }
              }           
            }
          }
        }
      }
      `;
    
     data = await client.request(query);  
     data.products.edges.forEach(async function(value: any){
     value['node']['images']=value['node']['images']['edges']
     let arrimg = [];
     for (let i =0 ;   i < value['node']['images'].length; i++ ){
         let img = {
           width: value['node']['images'][i]['node']['width'],
           height: value['node']['images'][i]['node']['height'],
           altText: value['node']['images'][i]['node']['altText'],
           originalSrc: value['node']['images'][i]['node']['src']
         };
         arrimg.push(img);
         
     }
     value['node']['images']=arrimg;
    //  console.log(value['node']);
     let arrVariants = [];
    //  console.log(value['node']['variants']['edges']);
     for (let i =0 ;   i < value['node']['variants']['edges'].length; i++ ){
         let variant ={
            title: value['node']['variants']['edges'][i]['node']['title'],
            quantityAvailable: value['node']['totalInventory'],
            weightUnit: 'KILOGRAMS',
            requiresShipping: true,
            price: value['node']['variants']['edges'][i]['node']['price'],
            image: value['node']['images']

         };
         
         arrVariants.push(variant);
        //  value['node']['variants']= arrVariants;
     }
     
      value['node']['variants']= arrVariants;
      // console.log(value['node']['variants']);



     
    let product_mongodb={  productId: value['node']['id'], 
                           handle: value['node']['handle'],
                           productType: value['node']['handle'],
                           title: value['node']['title'],
                           tags: value['node']['tags'],
                           merchant: value['node']['id'],
                           createdAt: '2021-10-29T20:19:01.000Z',
                           publishedAt: '2021-10-29T20:19:01.000Z',
                           updatedAt: '2021-10-29T20:19:01.000Z',
                           images: value['node']['images'],
                           variants: value['node']['variants']
 
      }

    console.log(product_mongodb);
    //  console.log(JSON.stringify(value['node']));
    const product = new productModel(product_mongodb);
     try {
      
      await product.save();
      console.log("Saving product in MongoDB Atlas");
      
    } catch (error) {
      
      console.log('error saving product');
    }
     
    

    });
     res.send(data)

})
// Importing the router
module.exports=router
module.exports.data=data;
