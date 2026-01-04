import jwt from "jsonwebtoken"

const genToken = async(userId)=>{
    try {
        return await jwt.sign({userId} , process.env.JWT_SECRET , {
            expiresIn:"7d"
        })
        
    
    } catch (error) {
        console.log("gen token error" , error)
    }
}

export default genToken