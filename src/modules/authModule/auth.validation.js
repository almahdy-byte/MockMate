import Joi from "joi";
import { generalValidation } from "../../middleWare/validation.middleWare.js";

export const registerValidationSchema = Joi.object({
    userName:generalValidation.firstName.required(),
    email:generalValidation.email.required(),
    role:generalValidation.role,
    // phone:generalValidation.phone.required(),
    password:generalValidation.password.required(),
})

export const confirmEmailValidationSchema = Joi.object({
    email:generalValidation.email.required(),
    code : generalValidation.code.required()
})

export const loginValidationSchema = Joi.object({
    email:generalValidation.email.required(),
    password : generalValidation.password.required()
})

export const changePasswordValidationSchema = Joi.object({
    code:generalValidation.code.required(),
    password : generalValidation.password.required()
})

export const resetEmailValidationSchema = Joi.object({
    tempEmail:generalValidation.email.required(),
})

export const changeEmailValidationSchema = Joi.object({
    tempEmailOTP:generalValidation.code.required(),
    changeEmailOTP: generalValidation.code.required()
})