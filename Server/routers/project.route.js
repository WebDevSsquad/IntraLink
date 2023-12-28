import { Router } from "express";
import projectController from "../controllers/project.controller.js";
const projectRouter = Router();

projectRouter.post("/add", projectController.Add);
projectRouter.get("/", projectController.Get);
export default projectRouter;
