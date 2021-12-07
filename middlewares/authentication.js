const jwt = require("jsonwebtoken");
const User = require('../model/userSchema');

const Authenticate = async (req,res,next) =>{
    try{

        const token = req.cookies.jwtoken;
        let rootUser;
        console.log(token);
        const verifyToken = jwt.verify(token,process.env.SECRET_KEY);

        rootUser = await User.findOne({_id:verifyToken._id, "tokens.token":token});

        // if(member=="Student"){
        //     rootUser = await Student.findOne({_id:verifyToken._id, "tokens.token":token});
        // }else if (member=="Placement Coordinator"){
        //     rootUser = await Placement.findOne({_id:verifyToken._id, "tokens.token":token});
        // }else if(member=="Company"){
        //     rootUser = await Company.findOne({_id:verifyToken._id, "tokens.token":token});
        // }else if(member=="Admin"){
        //     rootUser = await Admin.findOne({_id:verifyToken._id, "tokens.token":token});
        // }


        if(!rootUser){
            throw new Error("User not Found");
        }

        req.token=token;
        req.rootUser = rootUser;
        req.userID = rootUser._id;

        next();

    }catch(err){
        res.status(401).send("Unauthorized:No token provided");
        console.log(err);
    }
}

module.exports = Authenticate;