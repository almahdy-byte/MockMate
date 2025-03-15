import { model, Schema } from "mongoose";

export const interviewSchema = new Schema({
    question:[{
        type : String ,
        required:true,
        unique:true
    }],
    answers:[{
        type : String ,
        required:true,
        unique:true
    }],
    score:{
        type:Number,
    },
    field :{
        type : String
    },
    feedBack:[{
    }]
})




export const interviewModel = model('Questions' , interviewSchema)