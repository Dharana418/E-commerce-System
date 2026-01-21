import { createproduct, getallproducts, getproductdetails, updateproduct,deleteproduct } from '../controllers/productcontroller.js';
import express from "express";

const router=express.Router();

router.route('/admin/product/new').post(createproduct);

//get all products
router.route('/products').get(getallproducts);
//get product details
router.route('/product/:id').get(getproductdetails);
router.route('/admin/product/:id').put(updateproduct);
router.route('/admin/product/:id').delete(deleteproduct);


export default router;