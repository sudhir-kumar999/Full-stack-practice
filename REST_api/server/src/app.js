import express from "express";
const app = express();
import restRoutes from "./routes/restRoutes.js";
import cors from "cors";

app.use(express.json());
app.use(cors());
app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "hello from express",
  });
});

app.use("/rest", restRoutes);
export default app;
