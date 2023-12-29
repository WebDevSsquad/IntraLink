import { Router } from "express";
import marketController from "../controllers/market.controller.js";
const marketRouter = Router();

marketRouter.post("/add", marketController.Add);
marketRouter.delete("/delete", marketController.Delete);
marketRouter.get("/", marketController.Get);
export default marketRouter;
