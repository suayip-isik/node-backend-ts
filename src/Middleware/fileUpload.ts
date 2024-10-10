import { NextFunction, Request, Response } from "express";
import { configureUserPhotoUpload } from "../Config";
import multer from "multer";

const handleProfilePhotoUpload = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  configureUserPhotoUpload.single("profileImage")(req, res, (err: any) => {
    if (err instanceof multer.MulterError) {
      return res.status(413).json({
        success: false,
        message: "File size exceeds the limit",
      });
    } else if (err) {
      return res.status(415).json({
        success: false,
        message: "Unsupported file type",
      });
    } else if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Profile image is required",
      });
    }
    next();
  });
};

export { handleProfilePhotoUpload };
