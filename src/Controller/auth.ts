import bcrypt from "bcrypt";
import { Request, Response } from "express";
import db from "../Model";
import { generateAndSendToken } from "../Utils";
const { Users } = db;

const registerUser = async (req: Request, res: Response) => {
  try {
    const {
      userName,
      email,
      password,
      name,
      surname,
      phone,
      birthday,
      gender,
      country,
      city,
      bio,
    } = req.body;
    const requiredFields = ["userName", "email", "password", "name", "surname"];
    if (gender !== "male" && gender !== "female" && gender !== "other") {
      return res.status(400).json({
        success: false,
        message: "Cinsiyet alanı sadece male, female, other olabilir.",
      });
    }
    for (const field of requiredFields) {
      if (!req.body[field]) {
        return res.status(400).json({
          success: false,
          message: `${field} alanı zorunludur`,
        });
      }
    }
    let formattedBirthday = new Date(birthday);
    const data = {
      userName,
      email,
      password: await bcrypt.hash(password, 10),
      name,
      surname,
      phone,
      formattedBirthday,
      gender,
      country,
      city,
      bio,
    };

    const user = await Users.create(data);

    if (user) {
      let token = generateAndSendToken(user, res);
      return res.status(201).json({
        status: true,
        message: "Kullanıcı başarıyla oluşturuldu",
        token,
        user,
      });
    } else {
      return res.status(409).json({
        success: false,
        message: "Bu kullanıcı zaten kayıtlı.",
      });
    }
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};

const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const user = (await Users.findOne({
      where: {
        email: email,
      },
    })) as any;

    if (user) {
      const isSame = await bcrypt.compare(password, user.password);

      if (isSame) {
        let token = generateAndSendToken(user, res);
        return res.status(200).json({
          status: true,
          message: "Login işlemi başarıyla tamamlandı",
          token,
          user,
        });
      } else {
        return res.status(401).json({
          status: false,
          message: "Parolanızı kontrol ederek tekrar giriş yapmayı deneyiniz",
        });
      }
    } else {
      return res
        .status(401)
        .json({ status: false, message: "Kayıtlı kullanıcı bulunamadı" });
    }
  } catch (error) {
    console.log(error);
  }
};

const logout = async (req: Request, res: Response) => {
  try {
    res.clearCookie("token");
    return res
      .status(200)
      .json({ success: true, message: "Çıkış işlemi başarılı" });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};

export { login, registerUser, logout };
