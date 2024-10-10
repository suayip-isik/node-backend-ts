import express, { Router } from "express";
import {
  deleteUserAccount,
  fetchUserProfilePhoto,
  getAllUsers,
  updateUserProfile,
  uploadProfilePhoto,
} from "../Controller";
import { handleProfilePhotoUpload } from "../Middleware";

const userRouter: Router = express.Router();

userRouter.get("/users", getAllUsers);
userRouter.post(
  "/profile-photo/:userId",
  handleProfilePhotoUpload,
  uploadProfilePhoto
);
userRouter.get("/profile-photo/:userId", fetchUserProfilePhoto);
userRouter.put("/profile/:userId", updateUserProfile);
userRouter.delete("/account/:userId", deleteUserAccount);

export { userRouter };
