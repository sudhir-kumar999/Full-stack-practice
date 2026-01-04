import jwt from "jsonwebtoken";

const isAuth = async(req , res , next)=>{
    try {
        const token = req.cookies.token
        if(!token){
            return res.status(400).json({
                success:false,
                message:"token is not found"
            })
        }
        // console.log(process.env.JWT_SECRET)
        let verifyToken=await jwt.verify(token , process.env.JWT_SECRET)
        // console.log(verifyToken)
        req.userId=verifyToken.userId
        next()
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:`isAuth ${error}`
        })
        
    }
}

export default isAuth