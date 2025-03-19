import { model, Schema, Types } from "mongoose";
import { Roles } from "../../utils/enums/enums.js";
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
    role:{
        type:String,
        enum:Object.values(Roles),
        default:Roles.user
    }
})



export const userModel = model('Users' , userSchema);