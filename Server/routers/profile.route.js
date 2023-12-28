import { Router } from "express";
import ProfileController from "../controllers/profile.controller.js";

const ProfileRouter = Router();

ProfileRouter.post(
  "/update_user_info/:userID",
  ProfileController.updateUserInfo
);
ProfileRouter.post("/update_about/:userID", ProfileController.updateAbout);
ProfileRouter.post("/update_skills/:userID", ProfileController.updateSkills);
ProfileRouter.post("/remove_skill/:userID", ProfileController.removeSkill);
ProfileRouter.get("/get_user_info/:userID", ProfileController.getUserInfo);

export default ProfileRouter;
