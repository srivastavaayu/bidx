const express = require('express');
const router = express.Router();
const Product = require('../model/productSchema');
const Authenticate = require('../middlewares/authentication');
var mongoose = require('mongoose');
var dateTime = require('node-datetime');

router.get('/viewProduct',async (req,res)=>{
    try{
        var dt = dateTime.create();
        var formatted = dt.format('Y-m-d H:M:S');

        const date = new Date();
        // const date  = ISODate();
        //console.log(date);
        var finalResult=[];
        const result = await Product.find({duration:{$gt:date}});

        for(var i = 0; i < result.length; i++) {
            var obj = result[i];
        
            const d1 = new Date();
            const d2 = new Date(obj.duration);
            const hoursleft = Math.ceil((d2.getTime()-d1.getTime())/(1000 * 3600));
            var result1 = JSON.parse(JSON.stringify(obj));
            //result1.addProperty('hoursleft',hoursleft);
            result1.hoursleft = hoursleft;
            finalResult.push(result1);
        }

        console.log(finalResult);

        if(result){
            return res.status(202).json(finalResult);
        }else{
            return res.status(404).json({message:"Bad Request :)"});
        }
    }catch(err){
        console.log(err);
        return res.status(404).json({message:"Bad Requests :)"});
    }
})


module.exports = router;