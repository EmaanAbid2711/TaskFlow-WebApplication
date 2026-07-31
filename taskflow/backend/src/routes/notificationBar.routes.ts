import express from "express";

import { getNotificationBarController,  getUnreadNotificationBarCountController,  markNotificationBarReadController,  markAllNotificationBarReadController,  deleteNotificationBarController} from "../controllers/notificationBar.contoller";

const router = express.Router();

router.get("/", getNotificationBarController);
router.get("/unread-count", getUnreadNotificationBarCountController);
router.patch("/read-all", markAllNotificationBarReadController);
router.patch("/:id/read", markNotificationBarReadController);
router.delete("/:id", deleteNotificationBarController);

export default router;