import { Router } from "express";
import * as interviewServices from './interview.controller.js'
import { asyncErrorHandler } from "../../utils/errorHandlers/asyncErrorHandler.js";
import { auth } from "../../middleWare/auth.middleWare.js";
const router = Router();

router.post('/get-questions' , 
    auth(),
    asyncErrorHandler(interviewServices.generateQuestions)
)

router.post('/submit-interview/:interviewId' , 
    auth(),
    asyncErrorHandler(interviewServices.getInterviewResult)
)
router.get('/get-interviews/' , 
    auth(),
    asyncErrorHandler(interviewServices.getAllInterviews)
)
export default router;