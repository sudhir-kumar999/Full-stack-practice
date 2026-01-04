import express from "express";
import { login, logout, signup } from "../controllers/auth.cont.js";
import { forgotPassword,resetPasswordWithOtp } from "../controllers/frogetPass.js";

const authRouter = express.Router();

authRouter.post("/signup", signup);
authRouter.post("/login", login);
authRouter.get("/logout", logout);
authRouter.post("/forgot-password", forgotPassword);
authRouter.post("/reset-password", resetPasswordWithOtp);


export default authRouter;
