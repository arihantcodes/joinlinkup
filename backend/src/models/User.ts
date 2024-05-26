import mongoose  from "mongoose";
import { Schema } from "mongoose";

const UserSchema = new Schema ({
    username :{
        type:String,
        required:true,
        unique:true

    },

    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
    },
    profilePic:{
        type:String,
        default:""
    },
    
}) 