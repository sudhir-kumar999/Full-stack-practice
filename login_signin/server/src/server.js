const app = require("./app")
const connectDB = require("./config/db")

connectDB()
.then(()=>{
    console.log("database connected")
})
.catch((err)=>{
    console.log("db not connected ",err)
})
app.listen(5001,()=>{
    console.log("server is running")
})