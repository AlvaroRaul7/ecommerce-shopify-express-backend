import mongoose from 'mongoose';
export const ImageSchema = new mongoose.Schema({
  width: {
    type: Number,

  },
  height: {
    type: Number
  },
  altText:{
    type: String,
  },
  originalSrc:{
      type: String,
  },

});

export const Image = mongoose.model("Image", ImageSchema);


module.exports.Image = Image;
module.exports.ImageSchema = ImageSchema;