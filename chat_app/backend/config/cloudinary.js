import {v2 as cloudinary} from "cloudinary"
import fs from "fs"
import dotenv from "dotenv"
dotenv.config()
const uploadCloudinary=async(filePath)=>{
    // console.log(process.env.CLOUDINARY_API_SECRET)
    cloudinary.config({
        cloud_name:"de6bdunrd",
        api_key:process.env.CLOUDINARY_API_KEY,
        api_secret:process.env.CLOUDINARY_API_SECRET
    })

    try {
        const uploadResult = await cloudinary.uploader.upload(filePath)
        fs.unlinkSync(filePath)
        return uploadResult.secure_url
    } catch (error) {
        fs.unlinkSync(filePath)
        console.log("error from cloudinary", error)
    }

}

export default uploadCloudinary