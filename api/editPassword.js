const express = require('express');
const router = express.Router();
const Authenticate = require('../middlewares/authentication');
const User = require('../model/userSchema');
const bcrypt = require('bcrypt');

router.put('/editPassword',Authenticate , async (req,res)=>{
    try{
        var user = await User.findOne({'_id':req.rootUser._id});

        const validPassword = await bcrypt.compare(req.body.password, user.password);

        if(validPassword){
            const result = await User.updateOne({'_id':req.rootUser._id},{$set:{'password':req.body.newPassword}});
            if(result.modifiedCount)
                return res.status(202).json({message:"Password Updated Successfully :)"});
        }else{
            return res.status(404).json({message:"Wrong Password"});
        }
    }catch(err){
        console.log(err);
        return res.status(404).json({message:"Bad Requests"});
    }
})


module.exports = router;