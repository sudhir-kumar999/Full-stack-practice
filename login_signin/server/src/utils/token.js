const jwt = require("jsonwebtoken")

const generateAccessToken=(payload , secret)=>{
    return jwt.sign(payload , secret,{
    expiresIn:"1m" // max 15 min 
  })
}

const generateRefreshToken=(payload , secret)=>{
    const {userId} = payload
    console.log(userId)
    return jwt.sign({user_Id:userId} , secret,{
    expiresIn:"7d" // max 15 min 
  })
}

const verifyAccessToken=(token , secret)=>{
    return jwt.verify(token,secret)

}

const verifyRefreshToken=(token , secret)=>{
    return jwt.verify(token,secret)

}

module.exports={
    generateAccessToken , generateRefreshToken , verifyAccessToken , verifyRefreshToken
}