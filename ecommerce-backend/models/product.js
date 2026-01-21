const mongoose = require('mongoose');

const productschema=new mongoose.Schema({
    name:{
        type:String,
        required:[true,'Product name is required'],
        trim:true,
        maxlength:[100,'Product name cannot exceed 100 characters']
    },
    description:{
        type:String,
        required:[true,'Product description is required'],
        maxlength:[1000,'Product description cannot exceed 1000 characters']
    },
    price:{
        type:Number,
        required:[true,'Product price is required'],
        maxlength:[10,'Product price cannot exceed 10 digits']
    },
    category:{
        type:String,
        required:[true,'Product category is required'],
    },
    ratings:{
        type:Number,
        default:0
    },
    images:[{
        public_id:{
            type:String,
            required:true
    },
        url:{
            type:String,
            required:true

        }
    }],
    stock:{
        type:Number,
        required:[true,'Product stock is required'],
        maxlength:[5,'Product stock cannot exceed 5 digits'],
        default:0
    },
    numOfReviews:{
        type:Number,
        default:0
    },
    reviews:[{
        user:{
            type:mongoose.Schema.ObjectId,
            ref:'User',
            required:true
        },
        name:{
            type:String,
            required:true
        },
        rating:{
            type:Number,
            required:true
        },
        comment:{
            type:String,
            required:true
        }
}],


},{timestamps:true}
);
module.exports=mongoose.model('Product',productschema);