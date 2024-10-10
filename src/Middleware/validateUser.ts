import { Request, Response, NextFunction } from "express";
import db from "../Model";
const { Users } = db;

const validateUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
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

    const phone = await Users.findOne({
      where: {
        phone: req.body.phone,
      },
    });

    if (phone) {
      return res.status(409).json({
        success: false,
        message: "Bu telefon numarası zaten mevcut.",
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

export { validateUser };
