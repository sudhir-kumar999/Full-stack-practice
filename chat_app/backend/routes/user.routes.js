import express from "express"
import { login, logout, signup } from "../controllers/auth.cont.js"
import { editProfile, getCurrentUser, getOtherUser, search } from "../controllers/user.cont.js"
import isAuth from "../middleware/isAuth.js"
import { upload } from "../middleware/multer.js"

const userRouter = express.Router()

userRouter.get("/current",isAuth,getCurrentUser)
userRouter.put("/profile",isAuth,upload.single("image"),editProfile)
userRouter.get("/others",isAuth,getOtherUser)

userRouter.get("/search",isAuth,search)






export default userRouter