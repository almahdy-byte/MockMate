import { Router } from "express";
import * as interviewServices from './interview.controller.js'
import { asyncErrorHandler } from "../../utils/errorHandlers/asyncErrorHandler.js";
const router = Router();

router.post('/getQuestions' , 
    asyncErrorHandler(interviewServices.generateQuestions)
)


export default router;