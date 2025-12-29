const express=require("express")
const router = express.Router()
const Student = require("../models/userModels")
const bcrypt = require("bcrypt")
const { register, loginRoute, dashboard, newAccessToken } = require("../controller/userController")
const { checkLogin } = require("../middleware/checklogin")


router.post("/sign",register)
router.post("/login",loginRoute)
router.get("/new-token" , newAccessToken)
router.get("/dashboard" ,checkLogin, dashboard)

module.exports=router