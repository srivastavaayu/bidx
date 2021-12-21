const express = require('express');
const router = express.Router();
var multer = require('multer')
const Product = require('../model/productSchema');
const Authenticate = require('../middlewares/authentication');
var dateTime = require('node-datetime');

// var storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, 'D:/BIDX/uploads')
//   },
//   filename: function (req, file, cb) {
//     cb(null, file.originalname)
//   }
// })
// var upload = multer({ storage: storage });


router.post('/addProducts',Authenticate,async (req,res)=>{
  try{
    const {description, duration, basePrice, category,prodName,imageBase} = req.body;

    var duration1 = parseInt(duration);

    const date = new Date();
    console.log(duration1);
    var dt = dateTime.create();
    console.log(dt);
    dt.offsetInDays(duration1);
    var formatted = dt.format('Y-m-d H:M:S');

    //console.log(formatted);
    date.setDate(date.getDate() +duration1);

    console.log(date);


    var product = Product({
      'creatorId':req.rootUser._id,
      'creatorName':req.rootUser.firstName +' ' +req.rootUser.lastName,
      'basePrice':basePrice,
      'biddingPrice':basePrice,
      'duration':formatted,
      'description':description,
      'images':imageBase,
      'category':category,
      'prodName':prodName
    })

    await product.save();
    return res.status(202).json({messsage:"Product Added Successfully"});
  }catch(err){
    console.log(err);
    return res.status(404).json({messsage:"Bad Requests :)"});
  }
})








module.exports = router;