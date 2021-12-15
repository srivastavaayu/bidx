//user ne jo product sell k liye daale hai woh idhr hoge..
const express = require('express');
const router = express.Router();
const Product = require('../model/productSchema');
const Authenticate = require('../middlewares/authentication');
var mongoose = require('mongoose');
var dateTime = require('node-datetime');

//view bids of a particular seller
router.get('/soldItems',Authenticate,async (req,res)=>{
    try{

        const userName = req.rootUser.userName;


        const result = await Product.find({'creatorId':req.rootUser._id});

        console.log(result);

        if(result){
            return res.status(202).json(result);
        }else{
            return res.status(400).json({message:"There is No Bids. :)"});
        }

    }catch(err){
        console.log(err);
        return res.status(404).json({message:"Bad Requests :)"});
    }
})


module.exports = router;