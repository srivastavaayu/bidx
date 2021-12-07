const express = require('express');
const router = express.Router();
var multer = require('multer')
const Product = require('../model/productSchema');
const Authenticate = require('../middlewares/authentication');
var dateTime = require('node-datetime');

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
router.post('/addProduct', upload.array('product-images', 12),Authenticate,product);

async function product(req,res,next){
  try {

    //console.log(req.rootUser);

    var { description, duration, basePrice } = req.body;
    var fileLocation = [];
    for (var i = 0; i < req.files.length; i++) {
      //console.log(req.files[i]);
      fileLocation.push(req.files[i].path);
    }

    duration = parseInt(duration);

    console.log(duration);
    var dt = dateTime.create();
    console.log(dt);
    dt.offsetInDays(duration);
    var formatted = dt.format('Y-m-d H:M:S');

    console.log(formatted);



 
    // var currentDate = new Date();

    // console.log(duration);

    // currentDate.setDate(currentDate.getDate()+duration);

    // console.log(currentDate.getDate());

    const product = Product({
      'creatorId':req.rootUser._id,
      'creatorName':req.rootUser.firstName +' ' +req.rootUser.lastName,
      'basePrice':basePrice,
      'biddingPrice':basePrice,
      'duration':formatted,
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