const express = require('express');
const router = express.Router();
const Product = require('../model/productSchema');
const Authenticate = require('../middlewares/authentication');
var mongoose = require('mongoose');
var dateTime = require('node-datetime');

router.get('/viewParticularProduct',async (req,res)=>{
    try{
        var dt = dateTime.create();
        var formatted = dt.format('Y-m-d H:M:S');

        var productId = mongoose.Types.ObjectId(req.body.productId);        

        const date = new Date();
        // const date  = ISODate();
        console.log(date);
        const result = await Product.findOne({'_id':productId});
        console.log(result);

        if(result){
            return res.status(202).json(result);
        }else{
            return res.status(404).json({message:"Bad Request :)"});
        }
    }catch(err){
        console.log(err);
        return res.status(404).json({message:"Bad Requests :)"});
    }
})


module.exports = router;