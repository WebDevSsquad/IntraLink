import { Router } from "express";
import avacontroller from "../controllers/available.controller.js";
const avaRouter = Router();


// avaRouter.post("/availabilitytopost", avacontroller.updateavailable);
avaRouter.get("/availabilitytoget", avacontroller.getusersavailable);


export default avaRouter;
