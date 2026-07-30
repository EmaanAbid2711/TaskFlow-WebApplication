import express from "express";
import {getNotificationsBar, markNotificationBarRead} from "../controllers/notificationBar.contoller";

const router = express.Router();

router.get("/", getNotificationsBar);
router.patch("/:id/read", markNotificationBarRead);

export default router;