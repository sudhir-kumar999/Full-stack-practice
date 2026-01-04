import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import authRouter from "./routes/auth.routes.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import userRouter from "./routes/user.routes.js";
import messageRouter from "./routes/messageRoutes.js";
import {app, server} from "./socket/socket.js"
dotenv.config();
// const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
const PORT = process.env.PORT || 5000;

app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);
app.use("/api/message", messageRouter);



server.listen(PORT, (error) => {
  connectDB();
  console.log(`server is runing on port ${PORT}`);
  if (error) {
    console.log("Error occurred", Error);
  }
});
