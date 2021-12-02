const express = require('express');
const router = express.Router();
var multer  = require('multer')

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'D:/BIDX/uploads')
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname)
    }
})
var upload = multer({ storage: storage });

router.post('/addProduct',upload.array('product-files', 12), function (req, res, next){
    // req.files is array of `profile-files` files
    // req.body will contain the text fields, if there were any
    var fileLocation = [];
    for(var i=0;i<req.files.length;i++){
        console.log(req.files[i]);
        fileLocation.push(req.files[i].path);
    }
    
    return res.send(fileLocation);
})






module.exports = router;