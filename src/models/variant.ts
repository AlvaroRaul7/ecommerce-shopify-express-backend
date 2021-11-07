import mongoose from 'mongoose';
import {ImageSchema} from './image';
export const VariantSchema = new mongoose.Schema({
  title: {
    type: String,

  },
  quantityAvailable: {
    type: Number
  },
  image: {
    type: [ImageSchema]
  },
  price:{
    type: Number
  },
  requiresShipping:{
    type: Boolean
  },
  weightUnit:{
    type: String
  }
});

export const Variant = mongoose.model("Variant", VariantSchema);

module.exports = VariantSchema;
