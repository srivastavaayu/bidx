const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const User = require('../model/userSchema');

router.post('/registerUser',async (req,res)=>{

    try{

        const {userName,firstName,lastName,email,password,phone} = req.body;

        //username check
        const userNameCheck = await User.findOne({userName});

        if(userNameCheck){
            return res.status(422).json({message : "Already User with this Username registered"});
        }else{
            const user = User({userName,firstName,lastName,email,password,phone});

            // generate salt to hash password
            const salt = await bcrypt.genSalt(12);
            // now we set user password to hashed password
            user.password = await bcrypt.hash(user.password, salt);

            await user.save();


            return res.status(202).json({message:"User Registered Successfully"});
        }

    }catch(err){
        console.log(err);
        return res.status(404).json({message:"Bad Requests :)"});
    }
})



module.exports = router;