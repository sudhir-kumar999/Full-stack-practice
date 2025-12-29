const mongoose = require("mongoose")

const url = "mongodb+srv://sudhir:844502@qspider-backend.no9w0qf.mongodb.net/"

const connectDB=async()=>{
    await mongoose.connect(url)
}

module.exports=connectDB