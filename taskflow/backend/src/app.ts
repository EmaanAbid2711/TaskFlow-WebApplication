import express from "express";
import cors from "cors";

import authRoutes from "./routes/auth.routes";

const app = express();
app.use(cors());
app.use(express.json());
app.use("/api/auth", authRoutes);
app.get("/", (_, res) => {
  res.json({
    success: true,
    message: "TaskFlow Backend API is running 🚀",
  });
});

export default app;