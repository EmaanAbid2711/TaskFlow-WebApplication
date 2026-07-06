import express from "express";
import cors from "cors";

import authRoutes from "./routes/auth.routes";
import errorHandler from "./middleware/ErrorHandler";

const app = express();

app.use(cors());
app.use(express.json());
app.get("/", (_, res) => {
  res.json({
    success: true,
    message: "TaskFlow Backend API is running 🚀",
  });
});

app.use("/api/auth", authRoutes);
app.use(errorHandler);

export default app;