import mongoose, { Schema } from "mongoose";


const TokenSchema = new Schema({
    awdizToken:{
        type:[Object]
    }
})

export default mongoose.model("Token", TokenSchema)