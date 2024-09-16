import { Request, Response, NextFunction } from "express";
import db from "../Model";
const { Users } = db;

const saveUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const username = await Users.findOne({
      where: {
        userName: req.body.userName,
      },
    });
    if (username) {
      return res.status(409).json({
        success: false,
        message: "Bu kullanıcı adı zaten mevcut.",
      });
    }

    const emailcheck = await Users.findOne({
      where: {
        email: req.body.email,
      },
    });

    if (emailcheck) {
      return res.status(409).json({
        success: false,
        message: "Bu email zaten mevcut.",
      });
    }

    next();
  } catch (error) {
    console.log(error);
  }
};

export { saveUser };
