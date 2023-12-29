import { Router } from "express";
import subController from "../controllers/subscription.controller.js";
const subRouter = Router();



subRouter.post("/sub/:user_id", subController.updateusersub);


subRouter.get("/sub/getalluser", subController.getalluser);


export default subRouter;
