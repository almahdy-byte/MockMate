import { model, Schema, Types } from "mongoose";

export const interviewSchema = new Schema({
    position:{
        type:String
    },
    experience_years:{
        type:String
    },
    note:
        {type:String},
    degree:{type:String},

    interviewQA:[{
        difficulty:{
            type:String
        },
        number:{
            type:Number
        },
        question:{
            type:String
        } ,
        answer:{
            type:String,
        },
        status:{
            type:String,
            default:'not signed'
        },
        resource:[{
            type:String
        }]
    }],
    userId:{
        type :Types.ObjectId,
        required : true ,
        ref:"Users"
    },
    isCompleted:{
        type:Boolean,
        default:false
    },
    report:{
        type:String
    },
    total_score:{
        type:Number
    }, 
    feedbackTips:[{
        good:[
            {
                tip:{
                    type:String,
                },
                status:{
                    type:String,
                    default:'good'
                }
            }
        ],
        medium:[
            {
                tip:{
                    type:String,
                },
                status:{
                    type:String,
                }
            }
        ],
        bad:[
            {
                tip:{
                    type:String,
                },
                status:{
                    type:String,
                    default:'bad'
                }
            }
        ]
    }]
})




export const interviewModel = model('Interview' , interviewSchema)