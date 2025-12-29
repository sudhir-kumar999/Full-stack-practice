const { verifyAccessToken } = require("../utils/token");
const dotenv = require("dotenv")
dotenv.config()

const checkLogin = async(req , res , next)=>{
    const token = req.cookies.accessToken
    console.log("token is ",token)

    if (!token) {
    return res.status(401).json({
      success: false,
      message: "Not logged in"
    });
  }

  const decoded = verifyAccessToken(token , process.env.SECRET_KEY)
  req.user = decoded
  console.log(decoded)
    next()
}

module.exports={
    checkLogin
}