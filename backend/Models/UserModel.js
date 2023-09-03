import mongoose, { Schema } from "mongoose";


const userSchema = new Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    number:{
        type:Number,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    role:{
        type:String,
        enum:["Admin","Buyer","Seller"],
        default:"Buyer"
    },
    pin:{
        type:String,
    }
})

export default mongoose.model("User", userSchema)