import { Router } from "express";
import taskController from "../controllers/task.controller.js";
const taskRouter = Router();



taskRouter.get("/tmid/:projectid/:partid", taskController.gettaskswithtmid);


taskRouter.get("/pmid/:projectid/:partid", taskController.getpartinfo);


export default taskRouter;
