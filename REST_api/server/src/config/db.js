import dotenv from "dotenv";
dotenv.config();
import mongoose from "mongoose";




export const DBConnect = async () => {
  try {
    const URI = process.env.MONGO_URI;
    await mongoose.connect(URI);
    console.log("Database connected");
  } catch (error) {
    console.log("db error", error.message);
  }
};
