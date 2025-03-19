import { StatusCodes } from "http-status-codes";
import {  userModel } from "../../DB/models/user.model.js";
import { hash } from "../../utils/hash/hash.js";
import { encrypt } from "../../utils/crypt/encrypt.js";
import { code } from "../../utils/sendEmail/code.js";
import { template } from "../../utils/sendEmail/html.js";
import { emailEvent, subjects } from "../../utils/sendEmail/sendEmail.js";
import { compare } from "../../utils/hash/compare.js";
import { createToken } from "../../utils/token/createToken.js";
import { decodeToken } from "../../utils/token/decodeToken.js";
import { sign } from "../../utils/token/sign.js";
import {  Providers , tokenTypes } from "../../utils/enums/enums.js";


export const register = async(req , res , next)=>{
    const {userName , email , password } = req.body;
    const isExist = await userModel.findOne({email});
    if(isExist) 
        return next(new Error('Email already exist' , {cause:StatusCodes.BAD_REQUEST}));
    // const confirmEmailOTP =await code();
    // const html = template(confirmEmailOTP , `${firstName} ${lastName}` , subjects.confirmEmail);
    const user = await userModel.create({
        userName ,
        email , 
        password : hash(password)
    })
    const {accessToken , refreshToken} = await createToken(user.role , {id : user._id});
    // emailEvent.emit('confirmEmail' ,({to : email , html}))
    return res.status(StatusCodes.CREATED).json({success:true , user , accessToken , refreshToken});
}

// export const confirmEmail = async(req , res ,next)=>{
//     const {code , email} = req.body;
//     const user = await userModel.findOne({email});
//     if(!user) 
//         return next(new Error('user not found' , {cause:StatusCodes.NOT_FOUND}));
//     if(!compare( code , user.confirmEmailOTP))
//         return next(new Error('in-correct code' , {cause:StatusCodes.BAD_REQUEST}));
//     user.confirmEmailOTP = undefined;
//     user.isConfirmed = true;
//     await user.save();
//     return res.status(StatusCodes.CREATED).json({message:"confirmed the email", user});
// }


export const logIn = async(req , res , next)=>{
    const {email , password} = req.body
    const user = await userModel.findOne({email});
    if(!user) 
        return next(new Error('user not found' , {cause:StatusCodes.NOT_FOUND}));
    if(!compare( password , user.password))
        return next(new Error('in-correct email or password' , {cause:StatusCodes.BAD_REQUEST}));
    const {accessToken , refreshToken} = await createToken(user.role , {id : user._id});
    return res.status(StatusCodes.ACCEPTED).json({success:true,accessToken , refreshToken})
}

export const refreshToken =async(req , res, next)=>{
    const {refreshToken} = req.body;    
    const {user , accessSignature} = await decodeToken(refreshToken , tokenTypes.refresh , next);
    const accessToken = await sign({id : user._id} , accessSignature)
    return res.status(StatusCodes.ACCEPTED).json({user , accessToken});
}
// export const resetPassword =async(req , res , next)=>{
//     const user = req.user;
//     const resetPasswordOTP = await code();
//     const html = template(resetPasswordOTP , `${user.firstName} ${user.lastName} ` ,subjects.resetEmail);
//     emailEvent.emit('resetPassword' , ({to:user.email , html}));
//     user.resetPasswordOTP = hash(resetPasswordOTP);
//     await user.save();
//     return res.status(StatusCodes.ACCEPTED).json({message:'check your email' ,user})
// }

export const getProfile = async(req , res , next)=>{
    const user = req.user;
    res.status(StatusCodes.ACCEPTED).json({user})
}