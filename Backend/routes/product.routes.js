import { Router } from "express";
import { addProduct, deleteProduct, getProduct, updateProduct } from "../controller/product.controller.js";

const router = Router();


// getting all the product
router.get('/', getProduct)

// upload the product 
router.post('/', addProduct)
// delete the product 
router.delete('/:id', deleteProduct)

// updated product 
router.put('/:id', updateProduct)

export default router