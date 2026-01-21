import { createproduct, getallproducts, getproductdetails } from '../controllers/productcontroller.js';
import express from "express";

const router=express.Router();

router.route('/product/new').post(createproduct);

//get all products
router.route('/products').get(getallproducts);
//get product details
router.route('/product/:id').get(getproductdetails);

export default router;