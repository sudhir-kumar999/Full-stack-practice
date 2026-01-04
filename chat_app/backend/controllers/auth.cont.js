import genToken from "../config/token.js";
import User from "../models/user.model.js";
import bcrypt from "bcrypt";

export const signup = async (req, res) => {
  try {
    const { userName, email, password } = req.body;
    const checkUserByuserName = await User.findOne({ userName });
    if (checkUserByuserName) {
      return res.status(400).json({
        success: false,
        message: "user already exist",
      });
    }

    const checkUserByEmail = await User.findOne({ email });
    if (checkUserByEmail) {
      return res.status(400).json({
        success: false,
        message: "user already exist",
      });
    }

    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        message: "password must be at least 6 character",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      userName,
      email,
      password: hashedPassword,
    });

    const token =await genToken(user._id)

    res.cookie("token" , token,{
        httpOnly:true,
        maxAge:7*24*60*60*1000,
        sameSite:"Strict",
        secure:true 
    })

    return res.status(201).json(user)

  } catch (error) {
    return res.status(500).json({
        success:false,
        message:"signup error"
    })
  }
}; 


export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "user does not exist",
      });
    }

    

    const isMatch =await bcrypt.compare(password , user.password)
    
    if(!isMatch){
        return res.status(400).json({
        success: false,
        message:`incorrect password`

      });
    }


    const token =await genToken(user._id)

    res.cookie("token" , token,{
        httpOnly:true,
        maxAge:7*24*60*60*1000,
        sameSite:"Strict",
        secure:true 
    })

    return res.status(200).json(user)

  } catch (error) {
    return res.status(500).json({
        success:false,
        message:`login error ${error}`
    })
  }
}; 


export const logout= async(req , res)=>{
    try {
        res.clearCookie("token")
        return res.status(200).json({
        success:true,
        message:`logout successfully`
    })
    } catch (error) {
        return res.status(500).json({
        success:false,
        message:`logout error ${error}`
    })
    }
}