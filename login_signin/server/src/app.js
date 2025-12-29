const express = require("express")
const app = express()
const loginroutes = require("./routes/loginroutes")
const cors = require("cors")
const cookieParser = require("cookie-parser")

app.use(cookieParser());
app.use(express.json())
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));
app.get("/" , (req , res)=>{
    res.send("hello from server")
})

app.use("/user" , loginroutes)


module.exports=app