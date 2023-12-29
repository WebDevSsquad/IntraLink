import { Router } from "express";
import partController from "../controllers/part.controller.js";
const partRouter = Router();



partRouter.get("/pmid/:projectid", partController.getpartswithpmid);

partRouter.get("/pminfo/:projectid", partController.getpminfo);


export default partRouter;
