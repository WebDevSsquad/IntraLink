import { Router } from "express";
import authController from "../controllers/auth.controller.js";
import authMiddleware from "../middlewares/auth.middleware.js";
const authRouter = Router();

authRouter.post("/signup", authController.signup);
authRouter.post("/logIn", authController.login);
authRouter.post("/image", authController.updateImage);
authRouter.get("/me", authMiddleware, authController.me);
authRouter.get("/project", authMiddleware, authController.GetProject);
authRouter.get("/rank", authMiddleware, authController.GetUserRank);
export default authRouter;
