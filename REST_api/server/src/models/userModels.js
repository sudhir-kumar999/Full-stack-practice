import mongoose from "mongoose"

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    rating:{
        type:Number,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    image: {
        type: String,   // 👈 image URL
        required: true,
  }
})

export default mongoose.model("RestAPI", userSchema);