import { Router } from "express";
import * as interviewServices from './interview.controller.js'
import { asyncErrorHandler } from "../../utils/errorHandlers/asyncErrorHandler.js";
import { auth } from "../../middleWare/auth.middleWare.js";
import { validation } from "../../middleWare/validation.middleWare.js";
import { generateQuestionValidationSchema, submitInterviewValidationSchema } from "./interview.validation.js";
const router = Router();

router.post('/get-questions' , 
    auth(),
    validation(generateQuestionValidationSchema),
    asyncErrorHandler(interviewServices.generateQuestions)
)

router.post('/submit-interview/:interviewId' , 
    auth(),
    validation(submitInterviewValidationSchema),
    asyncErrorHandler(interviewServices.getInterviewResult)
)
router.get('/get-interviews/' , 
    auth(),
    asyncErrorHandler(interviewServices.getAllInterviews)
)
export default router;