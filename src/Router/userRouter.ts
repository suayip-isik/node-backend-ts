import express, { Router } from "express";
import { saveUser } from "../Middleware";
import {
  deleteUser,
  getUserProfilePhoto,
  getUsers,
  login,
  signup,
  updateProfile,
  uploadUserProfilePhoto,
} from "../Controller";
import multer from "multer";
import { upload } from "../Config";

const userRouter: Router = express.Router();

userRouter.post("/signup", saveUser, signup);
userRouter.post("/login", login);
userRouter.get("/getAllUsers", getUsers);
userRouter.post(
  "/uploadUserProfilePhoto/:id",
  function (req, res, next) {
    upload.single("image")(req, res, function (err) {
      if (err instanceof multer.MulterError) {
        return res.status(413).json({
          success: false,
          message: err.message,
        });
      } else if (err) {
        return res.status(415).json({
          success: false,
          message: err.message,
        });
      } else if (!req.file) {
        return res.status(400).json({
          success: false,
          message: "File is required",
        });
      }
      next();
    });
  },
  uploadUserProfilePhoto
);
userRouter.get(
  "/getUserProfilePhoto/:id",
  upload.single("image"),
  getUserProfilePhoto
);
userRouter.post("/updateUser/:id", updateProfile);
userRouter.delete("/deleteUser/:id", deleteUser);

export { userRouter };
