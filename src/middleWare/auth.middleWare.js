import { StatusCodes } from "http-status-codes";
import { tokenTypes } from "../utils/enums/enums.js"
import { asyncErrorHandler } from "../utils/errorHandlers/asyncErrorHandler.js"
import { decodeToken } from "../utils/token/decodeToken.js";

export const auth =()=>{
    return(asyncErrorHandler(async(req , res , next)=>{
        const authorization = req.headers['authorization'];
        const {user} = await decodeToken(authorization , tokenTypes.access , next );
        if(!user)
            return next(new Error('user not found' , {cause:StatusCodes.NOT_FOUND}))
        req.user = user;
        next()
    }))
}