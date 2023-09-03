import mongoose, { Schema } from "mongoose";


const productSchema = new Schema({
    image:{
        type:String
    },
    title:{
        type:String
    },
    price:{
        type:Number
    },
    category:{
        type:String
    },
    userId:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"User"
    }
})

export default mongoose.model("Products", productSchema )