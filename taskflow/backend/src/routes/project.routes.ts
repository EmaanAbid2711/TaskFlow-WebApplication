import { Router } from "express";

import authMiddleware from "../middleware/auth.middleware";
import {createProjectController, getProjectsController, getProjectController} from "../controllers/project.controller";

const router = Router();

router.post(
  "/",
  authMiddleware,
  createProjectController
);

router.get(
  "/",
  authMiddleware,
  getProjectsController
);

router.get(
  "/:id",
  authMiddleware,
  getProjectController
);

export default router;