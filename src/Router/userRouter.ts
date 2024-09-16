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
const router: Router = express.Router();

router.post("/signup", saveUser, signup);

router.post("/login", login);

router.get("/getAllUsers", getUsers);

router.post(
  "/uploadUserProfilePhoto/:id",
  function (req, res, next) {
    upload.single("image")(req, res, function (err) {
      if (err instanceof multer.MulterError) {
        res.status(413).json({
          success: false,
          message: err.message,
        });
      } else if (err) {
        res.status(415).json({
          success: false,
          message: err.message,
        });
      } else if (!req.file) {
        return res.end("File is required!");
      } else {
        next();
      }
    });
  },
  uploadUserProfilePhoto
);

router.get(
  "/getUserProfilePhoto/:id",
  upload.single("image"),
  getUserProfilePhoto
);

router.post("/updateUser/:id", updateProfile);

router.delete("/deleteUser/:id", deleteUser);

export { router };
