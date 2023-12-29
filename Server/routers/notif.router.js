import { Router } from "express";
import notifController from "../controllers/notif.controller.js";

const NotifRouter = Router();

NotifRouter.get("/getNotifications/:userID", notifController.getNotifications);
NotifRouter.post("/removeNotification", notifController.removeNotification);

export default NotifRouter;