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
        //console.log(date);
        var result = await Product.findOne({'_id':productId});
        //console.log(result);

        // const expiryDate = dateTime.create(result.duration);
        // const expiryFormatted = expiryDate.format('Y-m-d H:M:S');
        // console.log(expiryFormatted);
        // console.log(formatted);
        // var dates = expiryDate.getDatesInRange(dt);
        // console.log(dates);

        const d1 = new Date();
        const d2 = new Date(result.duration);
        const hoursleft = Math.ceil((d2.getTime()-d1.getTime())/(1000 * 3600));
        console.log(hoursleft);
        var result1 = JSON.parse(JSON.stringify(result));
        //result1.addProperty('hoursleft',hoursleft);
        result1.hoursleft = hoursleft;
        console.log(result1);
        
        if(result){
            return res.status(202).json(result1);
        }else{
            return res.status(404).json({message:"Bad Request :)"});
        }
    }catch(err){
        console.log(err);
        return res.status(404).json({message:"Bad Requests :)"});
    }
})


module.exports = router;