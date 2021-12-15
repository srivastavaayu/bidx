const express = require('express');
const router = express.Router();
const Authenticate = require('../middlewares/authentication');
const User = require('../model/userSchema');

router.get('/viewUserProfile',Authenticate,async (req,res)=>{
    try{
        
        console.log(req.rootUser);

        return res.status(202).json(req.rootUser);
    }catch(err){
        console.log(err);
        return res.status(404).json({message:"Bad Requests :)"});
    }
})


module.exports = router;
