import Joi from "joi";
import { generalValidation } from "../../middleWare/validation.middleWare.js";

export const generateQuestionValidationSchema = Joi.object({
    position : generalValidation.position.required(),
    note:generalValidation.note,
    experience_years : generalValidation.experience_years.required(),
    degree:generalValidation.degree.required()
});


export const submitInterviewValidationSchema = Joi.object({
    interviewId:generalValidation.id,
    answers:generalValidation.answers
}).required()