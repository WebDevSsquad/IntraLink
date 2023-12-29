import { Router } from "express";
import userDutiesController from "../controllers/userDutiesController.js";
const userDutiesRouter = Router();

userDutiesRouter.get(
  "/getUserProjects/:userID",
  userDutiesController.getUserProjects
);

userDutiesRouter.get(
  "/getUserTasks/:userID",
  userDutiesController.getUserTasks
);
userDutiesRouter.get(
  "/getUserParts/:userID",
  userDutiesController.getUserParts
);

export default userDutiesRouter;
