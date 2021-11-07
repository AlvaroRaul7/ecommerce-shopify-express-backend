import express, { Application, Request, Response } from "express";
import axios from 'axios';
import cookie from 'cookie';
import crypto, { KeyObject } from 'crypto';
import querystring from 'query-string';
import Shopify, {DataType} from '@shopify/shopify-api';
import { GraphQLClient } from "graphql-request";
const mongoose: any = require("mongoose");
import { MongoConnection } from "./loaders/mongo";
// Definition of constants

const app: Application = express();
const port = 3000;
const nonce = require('nonce')();
const dotenv = require('dotenv').config();
const shopifyPublicKey = process.env.API_KEY;
const shopifySecretKey: any = process.env.API_SECRET_KEY;
const scopes = 'write_products,read_products,unauthenticated_read_product_listings,unauthenticated_read_product_inventory';
const appUrl = 'https://099c-2800-484-5282-e300-d5b5-89c7-363d-3c9b.ngrok.io';

const shopifyroute=require("./routes/shopify_storefront.ts");
const UserRoute= require("./routes/user");
const ProductRoute = require("./routes/product.ts");
const CartRoute = require("./routes/cart.ts");
app.use("/shopify_api",shopifyroute);
app.use("/add_user",UserRoute);
app.use("/product", ProductRoute);
app.use("/cart", CartRoute);
// Body parsing Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get(
    "/",
    async (req: Request, res: Response): Promise<Response> => {
        return res.status(200).send({
            message: "Hello World!",
        });
    }
);

MongoConnection();
const buildRedirect = () => `${appUrl}/shopify/callback`;

const buildInstallUrl = (shop: any, state: any, redirectUri: any) => `https://${shop}/admin/oauth/authorize?client_id=${shopifyPublicKey}&scope=${scopes}&redirect_uri=${redirectUri}&state=${state};`;

const buildAccessToken = (shop: any) => `https://${shop}/admin/oauth/access_token`;

const buildShopDataRequest = (shop: any) => `https://${shop}/admin/shop.json`;

const generateHash = (params: any) => crypto.createHmac('sha256', shopifySecretKey).update(params).digest('hex');

const fetchToken = async(shop: any,data: any) => await axios(buildAccessToken(shop),{
    method:'POST',
    data
});

const fetchShopData = async(shop: any, accessToken: any) => await axios(buildShopDataRequest(shop),{
    method: 'GET',
    headers: {
    'X-Shopify-Access-Token': accessToken
  }

});

app.get('/shopify', (req, res) => {
    const shop = req.query.shop;
  
    if (!shop) { return res.status(400).send('no shop')}
  
    const state = nonce();
  
    const installShopUrl = buildInstallUrl(shop, state, buildRedirect())
    console.log(installShopUrl);
    res.cookie('state', state) // should be encrypted in production
    res.redirect(installShopUrl);
  });
  

  app.get('/shopify/callback', async (req, res) => {
    const { shop, code, state } = req.query;
    const strcookie: string = req.headers.cookie!;
    const stateCookie = cookie.parse(strcookie).state;
  
    if (state !== stateCookie) { return res.status(403).send('Cannot be verified')}
  
    const { hmac, ...params } = req.query
    const queryParams = querystring.stringify(params)
    const hash = generateHash(queryParams)
  
    if (hash !== hmac) { return res.status(400).send('HMAC validation failed')}
  
    try {
      const data = {
        client_id: shopifyPublicKey,
        client_secret: shopifySecretKey,
        code
      };
      const tokenResponse = await fetchToken(shop, data)
     
  
      const { access_token } = tokenResponse.data
  
      const shopData = await fetchShopData(shop, access_token)
    //   console.log(shopData);
      const shop_id = shopData['data']['shop']['id'];
      console.log(shop_id);
      const client = new Shopify.Clients.Rest('mercado593.myshopify.com', access_token);
      const data_storefront: any = await client.post({
      path: 'storefront_access_tokens',
      data: {"storefront_access_token":{"title":"Test"}},
      type: DataType.JSON,
       });
    

      const storefront = data_storefront['body']['storefront_access_token']['access_token'];
      console.log(storefront);
      process.env.STOREFRONT_ACCESSTOKEN = storefront;


    
     
     
      res.send(data_storefront)
  
    } catch(err) {
      console.log(err)
      res.status(500).send('something went wrong')
    }
  
  });


  try {
    app.listen(port, (): void => {
        console.log(`Connected successfully on port ${port}`);
    });
} catch (err) {
    if (err instanceof Error) {
    console.log(err.message);
  }
}


// https://099c-2800-484-5282-e300-d5b5-89c7-363d-3c9b.ngrok.io/shopify?shop=mercado593.myshopify.com
// https://mercado593.myshopify.com/admin/oauth/authorize?client_id=e86383631493ae016cc0c7985d6fb42d&scope=write_products,read_products&redirect_uri=https://099c-2800-484-5282-e300-d5b5-89c7-363d-3c9b.ngrok.io/shopify/callback&state=163608457515100