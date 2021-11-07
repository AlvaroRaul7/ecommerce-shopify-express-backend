import mongoose from 'mongoose';
import { ProductSchema } from './product';
export const CartSchema = new mongoose.Schema({

  id: {
    type: Number
  },
  lineItems: {
    type: Array
  }
});

export const Cart = mongoose.model("Cart", CartSchema);


module.exports=Cart;
