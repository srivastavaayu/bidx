const express = require('express');
const router = express.Router();
var multer = require('multer')
const Product = require('../model/productSchema');

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'D:/BIDX/uploads')
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname)
  }
})
var upload = multer({ storage: storage });


// add a product api's
router.post('/addProduct', upload.array('product-images', 12),product);

async function product(req,res,next){
  try {

    const { description, duration, basePrice } = req.body;
    var fileLocation = [];
    for (var i = 0; i < req.files.length; i++) {
      console.log(req.files[i]);
      fileLocation.push(req.files[i].path);
    }

    const product = Product({
      'basePrice':basePrice,
      'biddingPrice':basePrice,
      'duration':duration,
      'description':description,
      'images':fileLocation
    })

    await product.save();
    return res.status(202).json({messsage:"Product Added Successfully"});
    //return res.send(fileLocation);

  } catch (err) {
    console.log(err);
    return res.status(404).json({ messsage: "Bad Requests :)" });
  }
}




module.exports = router;