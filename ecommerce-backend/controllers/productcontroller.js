import Product from '../models/product.js';
import asyncHandler from 'express-async-handler';


export const createproduct=asyncHandler(async(req,res,next)=>{
    const newProduct=await Product.create(req.body);
    res.status(201).json({
        success:true,
        product:newProduct
    })
})

export const getallproducts=asyncHandler(async(req,res,next)=>{
    const products=await Product.find();
    res.status(200).json({
        success:true,
        products
    })
})

//get product details
export const getproductdetails=asyncHandler(async(req,res,next)=>{
    const product=await Product.findById(req.params.id);
    if(!product){
        return res.status(404).json({
            success:false,
            message:'product not found'
        })
    }
    res.status(200).json({
        success:true,
        product
    })
})