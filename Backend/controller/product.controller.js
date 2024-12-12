import Product from '../Model/product.model.js';
import mongoose from 'mongoose';

export const getProduct = async (req, res) => {
  try {
    const product = await Product.find({});
    res.status(200).json({ sucess: true, data: product });
  } catch (error) {
    res.status(500).json({ sucess: false, message: error })
  }
}

export const addProduct = async (req, res) => {
  const product = req.body;
  if (!product.name || !product.price || !product.image) {
    return res.status(400).json({ sucess: false, message: 'Please provide all the fields' })
  }
  const newProduct = new Product(product)
  try {
    await newProduct.save();
    res.status(201).json({ sucess: true, data: newProduct });
  } catch (error) {
    res.status(500).json({ sucess: false, message: 'Internal Server Error' })
  }

}

export const deleteProduct = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ sucess: false, message: '404 Product Not found' })
  }
  try {
    await Product.findByIdAndDelete(id);
    res.status(200).json({ sucess: true, message: 'product deleted sucessfully' });
  } catch (error) {
    res.status(404).json({ sucess: false, message: 'product not found' });
  }
}

export const updateProduct = async (req, res) => {
  const { id } = req.params;
  const product = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ sucess: false, message: '404 Product Not found' })
  }


  try {
    const updateProduct = await Product.findByIdAndUpdate(id, product, { new: true });
    res.status(200).json({ sucess: true, product: updateProduct, message: 'Product updated sucessfully' });
  } catch (error) {
    res.status(500).json({ message: false, message: 'Internal server error' });
  }
}