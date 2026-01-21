const express=require('express');
const { createproduct, getallproducts, getproductdetails, updateproduct, deleteproduct, createproductreview, getproductreviews, deleteproductreview } = require('../controllers/productcontroller');
const { isauthenticateduser, authorizeRoles } = require('../middlewares/authenticate');

const router=express.Router();

router.route('/product/new').post(isauthenticateduser,authorizeRoles('admin'),createproduct);

//get all products
router.route('/products').get(getallproducts);
//get product details
router.route('/product/:id').get(getproductdetails);

