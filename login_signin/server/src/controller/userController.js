const express=require("express")
const router = express.Router()
const Student = require("../models/userModels")
const bcrypt = require("bcrypt")
const dotenv = require("dotenv")
const { generateAccessToken, generateRefreshToken, verifyRefreshToken } = require("../utils/token")
dotenv.config()

const register = async (req, res) => {
  const { name, age, email, password } = req.body;
  console.log(name, age, email, password);

  const hashed = await bcrypt.hash(password, 10);

  const user = new Student({
    name,
    age,
    email,
    password: hashed,
  });
  await user.save();
  res.json("sign in success");
};

const loginRoute =  async(req , res)=>{
    const {email ,password} = req.body;

    const user =await Student.findOne({email:email})
    if(!user){
        return res.send("invalid user sign in first")
    }
    const isValidPass =await bcrypt.compare(password , user.password)
    if(!isValidPass){
        return res.json("invalid password")
    }

    const payload ={
        emailId:user.email,
        userId:user._id
    }
    console.log(payload)
    const accessToken = generateAccessToken(payload , process.env.SECRET_KEY)
    const refreshToken = generateRefreshToken(payload , process.env.REFRESH_KEY)
    console.log(accessToken)
    res.cookie("accessToken",accessToken,{
  httpOnly: true,
  secure: false,      // localhost pe false
  sameSite: "lax",    // localhost ke liye
})
res.cookie("refreshToken",accessToken,{
  httpOnly: true,
  secure: false,      // localhost pe false
  sameSite: "lax",    // localhost ke liye
})
    return res.status(200).json({
  success: true,
  message: "Login successful",
  data: {
    userId: user._id,
    email: user.email
  }
});
}

const newAccessToken =async(req , res)=>{
    const ref_token = req.cookies.refreshToken
    console.log(ref_token)
    if(!ref_token){
        res.json("no ref token login first")
    }

    const payload = verifyRefreshToken(ref_token , process.env.REFRESH_KEY)
    const user = await Student.findById(payload.userId);
  console.log(user);
  if (!user) {
    res.send("user not found");
  }
  // const newAccessToken = generateAccessToken(payload.userId, process.env.SECRET_KEY);
  const newAccessToken = generateAccessToken(
    {
      emailId: user.email,
      user_id: user._id,
    },
    process.env.SECRET_KEY
  );
  // const refreshToken = generateAccessToken(user, process.env.REFRESH_KEY);
  console.log("new token", newAccessToken);
  res.cookie("accessToken", newAccessToken);
  return res.send("new refresh token generated", newAccessToken);
    
}

const dashboard=async(req , res)=>{
    res.json("hello")
}



module.exports={
    register , loginRoute , dashboard , newAccessToken
}