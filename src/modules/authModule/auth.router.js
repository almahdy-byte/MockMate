import { Router } from "express";
import {validation} from '../../middleWare/validation.middleWare.js' 
import {  confirmEmailValidationSchema, loginValidationSchema, registerValidationSchema } from "./auth.validation.js";
import * as authServices from './auth.controller.js'
import { asyncErrorHandler } from "../../utils/errorHandlers/asyncErrorHandler.js";
import { auth } from "../../middleWare/auth.middleWare.js";
const router = Router();


router.get('/' , (req , res  , next)=>{
    return res.json({message:'auth router'})
})

router.post('/register',
    validation(registerValidationSchema) , 
    asyncErrorHandler(authServices.register))
// router.patch('/confirm-email',
//     validation(confirmEmailValidationSchema) , 
//     asyncErrorHandler(authServices.confirmEmail))
router.post('/log-in',
    validation(loginValidationSchema) , 
    asyncErrorHandler(authServices.logIn))
router.post('/refresh-token',
    asyncErrorHandler(authServices.refreshToken))
router.get('/profile',
    auth(),
    asyncErrorHandler(authServices.getProfile))
export default router