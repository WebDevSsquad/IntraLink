import { Router } from "express";
import postController from "../controllers/post.controller.js";
const postRouter = Router();

postRouter.post("/add", postController.Add);
postRouter.delete("/delete", postController.Delete);
postRouter.get("/", postController.Get);
export default postRouter;
