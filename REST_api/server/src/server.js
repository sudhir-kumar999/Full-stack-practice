import dotenv from "dotenv";
dotenv.config();
import app from "./app.js";
import { DBConnect } from "./config/db.js";

const PORT= process.env.PORT;

DBConnect();


app.listen(PORT, (err) => {
  console.log(`server is running on port ${PORT}`);
  if (err) {
    console.log("error", err);
  }
});
