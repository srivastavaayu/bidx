const mongoose = require('mongoose');
const  jwt = require('jsonwebtoken');

const productSchema = mongoose.Schema({
    creatorId:{
        type:String
    },
    creatorName:String,
    date:{
        type:Date,
        default:Date.now()
    },
    basePrice:{
        type:Number,
        required:true
    },
    biddingPrice:{
        type:Number,
        required:true
    },
    duration:{
        type:Date
    },
    description:{
        type:String,
        required:true
    },
    images:{
        type:String
    },
    bids:{
        type:Array
    },
    category:String,
    sendNotification:{
        type:Boolean,
        default:false
    },
    prodName:String   

});


const Product = mongoose.model('Product',productSchema);

module.exports = Product;