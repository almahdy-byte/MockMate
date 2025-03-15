import { model, Schema, Types } from "mongoose";
const userSchema = new Schema({
    userName:{
        type : String,
        required : true
    },
    email:{
        type:String,
        required:true,
        unique:true
    } , 
    password:{
        type:String , 
    },
})



export const userModel = model('Users' , userSchema);