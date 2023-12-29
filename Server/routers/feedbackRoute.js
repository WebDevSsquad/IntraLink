import { Router } from "express";
import feedbackController from "../controllers/feedbackController.js";
const feedbackRouter = Router();

feedbackRouter.get(
  "/getTaskManagers/:projectManagerID",
  feedbackController.getForProjectManagersAllTaskManagers
);
feedbackRouter.get(
  "/getContributors/:taskManagerID",
  feedbackController.getForTaskManagersAllContributors
);

feedbackRouter.post("/giveFeedback", feedbackController.giveFeedBack);

export default feedbackRouter;
