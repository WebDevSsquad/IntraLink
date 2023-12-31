import { Router } from "express";
import chatController from "../controllers/chatController.js";

const chatRouter = Router();

chatRouter.post("/send", chatController.sendMessage);

chatRouter.get("/last_messages/:userID", chatController.getLastMessages);

chatRouter.get(
  "/last_messages/:currUserID/:otherUserID",
  chatController.getMessages
);
export default chatRouter;
