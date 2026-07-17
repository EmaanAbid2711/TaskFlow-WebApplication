import express from "express";
import cors from "cors";
import swaggerUi from "swagger-ui-express";

import authRoutes from "./routes/auth.routes";
import userRoutes from "./routes/user.routes";
import accountRoutes from "./routes/account.routes";
import notificationRoutes from "./routes/notification.routes";
import billingRoutes from "./routes/billing.routes";
import dashboardRoutes from "./routes/dashboard.routes";
import swaggerSpec from "./config/swagger";
import errorHandler from "./middleware/ErrorHandler";
import path from "path";

const app = express();

app.use(
  cors({
    origin: [
      "https://task-flow-frontend-1xqabrc3d-emaanabid2711s-projects.vercel.app",
      "https://task-flow-frontend-woad.vercel.app",
      "http://localhost:5173",
    ],
    credentials: true,
  })
);

app.use(express.json());

app.get("/", (_, res) => {
  res.json({
    success: true,
    message: "TaskFlow Backend API is running 🚀",
  });
});

app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(swaggerSpec)
);

app.use(
  "/uploads",
  express.static(
    path.join(
      process.env.RAILWAY_VOLUME_MOUNT_PATH || "uploads"
    )
  )
);

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/account", accountRoutes);
app.use("/api/notifications", notificationRoutes);
app.use("/api/billing", billingRoutes );

app.use(errorHandler);

export default app;