import Joi from "joi";
import { Roles } from "../utils/enums/enums.js";
import { StatusCodes } from "http-status-codes";
import {Types } from 'mongoose'
export const validation = (schema)=>{
    return (req,res,next)=>{
        const data = {
            ...req.body,
            ...req.params,
            ...req.query    
        }
        
        const result = schema.validate(data);
        let errors = [];
        if(result.error){
            errors.push(result.error.details[0].message)
            return next(new Error(errors) , {cause:StatusCodes.BAD_REQUEST})  
        }
        next();
}
}

const idValidation =(id)=>{
    return Types.ObjectId.isValid(id) ? true : helper.message = "Invalid ID";
}

const answerSchema = Joi.object({
  number: Joi.number().integer().min(1),
  answer: Joi.string(),
  questionId: Joi.custom(idValidation)
});





export const generalValidation = {
    firstName : Joi.string(),
    lastName : Joi.string(),
    email:Joi.string().email(),
    password:Joi.string().min(6),
    phone:Joi.string(),
    role : Joi.string().valid(...Object.values(Roles)),
    code : Joi.string().length(6),
    position:Joi.string(),
    experience_years:Joi.string(),
    degree:Joi.string(),
    note:Joi.string(),
    id:Joi.custom(idValidation),
    answers: Joi.array().items(answerSchema)
}