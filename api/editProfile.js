const express = require('express');
const router = express.Router();
const Authenticate = require('../middlewares/authentication');
const User = require('../model/userSchema');

router.put('/editProfile',Authenticate,async (req,res)=>{
    try{
        const {firstName,lastName,email,phone} = req.body

        const doc = {$set:{
            'firstName':firstName,
            'lastName':lastName,
            'email':email,
            'phone':phone
        }}
        const result = await User.updateOne({'_id':req.rootUser._id},doc);

        console.log(result);

        if(result.modifiedCount){
            return res.status(202).json({message:"Profile Updated Successfully"});
        }else{
            return res.status(404).json({message:"Bad Requests :)"});
        }
    }catch(err){
        console.log(err);
        return res.status(404).json({message:"Bad Requests :)"});
    }
})


module.exports = router;
