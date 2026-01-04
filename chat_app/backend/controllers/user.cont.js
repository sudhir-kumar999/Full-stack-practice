import uploadCloudinary from "../config/cloudinary.js"
import User from "../models/user.model.js"


export const getCurrentUser =async(req , res)=>{
    try {
        let userId = req.userId
        const user = await User.findById(userId).select("-password")
        if(!user){
            return res.status(400).json({
                success:false,
                message:"user not found"
            })
        }
        return res.status(200).json(user)
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:`user found error ${error}`
        })
    }
}

export const editProfile=async(req , res)=>{
     try {
        let {name} = req.body;
        let image ;
        if(req.file){
            image=await uploadCloudinary(req.file.path)
        }

        let user =await User.findByIdAndUpdate(req.userId,{
             name,
             image
        },{new:true})
        if(!user){
            return res.status(400).json({
                success:false,
                message:"user is not found"
            })
        }
        return res.status(200).json(user)
     } catch (error) {
        return res.status(400).json({
                success:false,
                message:`Error at edit profile ${error}`
            })
     }
}

export const getOtherUser=async(req , res)=>{
   try {
     let users = await User.find({
        _id:{$ne:req.userId}
     }).select("-password")

     return res.status(200).json(users)
   } catch (error) {
    console.log("error form get all user",error)
   }
}

export const search=async(req,res)=>{
    try {
        let {query} = req.query
        if(!query){
            return res.status(400).json({
                message:"query is required to find"
            })
        }

        let users =await User.find({
            $or:[
                {name:{$regex:query,$options:"i"}}, 
                {userName:{$regex:query,$options:"i"}}
            ]
        })
        return res.status(200).json(users)
    } catch (error) {
        return res.status(400).json({
                message:`search users error ${error}`
            })
    }
}