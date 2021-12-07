const express = require('express');
const router = express.Router();
const Product = require('../model/productSchema');
const Authenticate = require('../middlewares/authentication');
var mongoose = require('mongoose');
var dateTime = require('node-datetime');


//view recieved bids of particular product for customer
router.get('/recievedBid',Authenticate,async (req,res)=>{
    try{

        var productId = mongoose.Types.ObjectId(req.body.productId);

        const result = await Product.find({'_id':productId,'creatorId':req.rootUser._id});

        if(result){
            return res.status(202).json(result);
        }else{
            return res.status(400).json({message:"There is No product :)"});
        }

    }catch(err){
        console.log(err);
        return res.status(404).json({message:"Bad Requests :)"});
    }
})







module.exports = router;