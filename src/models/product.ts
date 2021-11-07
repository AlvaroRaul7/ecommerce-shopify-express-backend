import mongoose from 'mongoose';
import {ImageSchema} from './image';  
import { VariantSchema } from './variant';
export const ProductSchema = new mongoose.Schema({
    productId: {
      type: String,
    },
    handle: {
      type: String,
    },
    productType: {
      type: String,
    },
    title: {
      type: String,
    },
    tags: {
      type: [String],
    },
    merchant:{
      type: String,
    },
    createdAt:{
      type: String,
    },
    publishedAt:{
      type: String,
    },
    updatedAt:{
      type: String,
    },
    images:{
        type: Array,
    },
    variants:{
        type: Array
    }

  });
  
  const Product = mongoose.model("Product", ProductSchema);
  
  module.exports = Product ;
  module.exports.ProductSchema = ProductSchema;