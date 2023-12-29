import { Router } from "express";
import avacontroller from "../controllers/available.controller.js";
const avaRouter = Router();

// avaRouter.post("/availabilitytopost", avacontroller.updateavailable);
avaRouter.get("/availabilitytoget", avacontroller.getusersavailable);
avaRouter.post("/sendInvitation/:userID", avacontroller.sendInvitation);

export default avaRouter;