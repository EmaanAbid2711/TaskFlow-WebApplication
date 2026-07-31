import express from "express";

import { getNotificationBarController,  getUnreadNotificationBarCountController,  markNotificationBarReadController,  markAllNotificationBarReadController,  deleteNotificationBarController} from "../controllers/notificationBar.controller";
import authMiddleware from "../middleware/auth.middleware";

const router = express.Router();

router.use(authMiddleware);
router.get("/", getNotificationBarController);
router.get("/unread-count", getUnreadNotificationBarCountController);
router.patch("/read-all", markAllNotificationBarReadController);
router.patch("/:id/read", markNotificationBarReadController);
router.delete("/:id", deleteNotificationBarController);

export default router;