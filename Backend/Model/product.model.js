import { model, Schema } from "mongoose";

const productSchema = Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  image: {
    type: String,
    required: true
  }
})

const Product = model('product',productSchema);

export default Product

