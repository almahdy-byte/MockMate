import { StatusCodes } from "http-status-codes";
import axios from "axios";
import { interviewModel } from "../../DB/models/interview.model.js";
import { generateQuestionsFromAi } from "../../utils/AI/generateQuestions.js";
import { evaluateInterviewAnswers } from "../../utils/AI/getResult.js";

export const generateQuestions = async (req, res, next) => {
    const { position, experience_years, note, degree } = req.body;

    const {questions} = await generateQuestionsFromAi(position , note , experience_years , degree ,next)
        const interview = await interviewModel.create({
            experience_years  , position , degree , interviewQA :questions , userId : req.user._id , domain : position
        })
        return res.status(StatusCodes.ACCEPTED).json({interview})
};




export const getAllInterviews = async(req , res , next)=>{
    const interviews = await interviewModel.find({
        // userId : req.user._id,
    }).select('total_score position createdAt isCompleted')
    if(!interviews.length) 
        return next(new Error('interviews not found' , {cause : StatusCodes.NOT_FOUND}));
    return res.status(StatusCodes.ACCEPTED).json({success:true , interviews})
}


export const getInterviewResult = async (req, res, next) => {
    const {answers} = req.body;
    const {interviewId} = req.params
    const interview = await interviewModel.findById(interviewId);
    if(!interview) 
        return next(new Error('interview not found' , {cause : StatusCodes.NOT_FOUND}));
    if(req.user._id.toString()!==interview.userId.toString())
        return next(new Error('you are not allowed to answer this questions' , {cause:StatusCodes.BAD_REQUEST}));
    const QA = interview.interviewQA ;
    for (const answer of answers) {
        QA.map(e =>  {
            if(e._id.toString() === answer.questionId.toString())
                {
                if(!answer.answer){
                    answer.answer ='not answered yet'
                }
                e.answer = answer.answer
                }
            })
    }
    
        interview.interviewQA = QA;
        const interviewQA = interview.interviewQA
        const interview_data = interviewQA.map(e=> e={
            question : e.question ,answer : e.answer ,number :  e.number
        })
        const response = await evaluateInterviewAnswers(interview_data , next);
        
        const {scores , total_score ,report , feedbackTips  } = response;

        interviewQA.forEach(e => {
            const scoreData = scores.find(s => s.number === e.number);
            if (scoreData) {
                Object.assign(e, scoreData); 
            }
        });
        interview.interviewQA = interviewQA;
        interview.total_score = total_score;
        interview.report = report;
        interview.isCompleted = true;
        interview.feedbackTips = feedbackTips
        await interview.save()
        return res.status(StatusCodes.OK).json({ success: true  , interview});
        };
