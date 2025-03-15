import { StatusCodes } from "http-status-codes";
import { DBConnection } from "./DB/connection.js";
import authRouter from "./modules/authModule/auth.router.js";
import { globalErrorHandler } from "./utils/errorHandlers/globalErrorHandler.js";
import interviewRouter from "./modules/interviewModule/interview.router.js";


export const bootstrap = async (app ,express)=>{
app.use(express.json());
await DBConnection();


app.use('/auth' , authRouter)

app.use('/interview' , interviewRouter)


app.use('*' ,(req ,res ,next)=>{
    return res.status(StatusCodes.ACCEPTED).json({message : 'page not found'})
})
app.use(globalErrorHandler)
}