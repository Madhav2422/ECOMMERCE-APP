import JWT from "jsonwebtoken"
import userModel from "../models/userModel.js";

//Protected routes token based 
export const requireSignIn = async (req,res,next)=>{
    try{
        const decode= JWT.verify(
            req.headers.authorization,
            process.env.JWT_SECRET
        );
        req.user=decode
        next();
    }
    catch(err){
        console.log(err);
    }
}

//Admin access
export const isAdmin= async(req,res,next)=>{
    try{
        const user = await userModel.findById(req.user._id)
        if(user.role !== 1)
            {
                return res.status(401).send({
                    success:false,
                    msg:"Unauthorized Access"
                })
            }else{
                next();
            }
    }
    catch(err){
        console.log(err);
        res.status(401).send({
            success:false,
            err,
            msg:"Error in the admin middleware"
        })
    }
}