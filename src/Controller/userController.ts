import bcrypt from "bcrypt";
import { Request, Response } from "express";
import db from "../Model";
import { generateAndSendToken } from "../Utils";
const { Users } = db;

const signup = async (req: Request, res: Response) => {
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

const getUsers = async (req: Request, res: Response) => {
  try {
    const users = await Users.findAll();
    return res.status(200).send(users);
  } catch (error) {
    console.log(error);
  }
};

const uploadUserProfilePhoto = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const user = await Users.findByPk(id);
    if (!user) {
      return res.status(404).json({ message: "Kullanıcı bulunamadı" });
    }
    res
      .status(200)
      .json({ status: true, message: "Profil fotoğrafı güncellendi", user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Bir hata oluştu" });
  }
};

const getUserProfilePhoto = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const user = await Users.findByPk(id);
    if (!user) {
      return res.status(404).json({ message: "Kullanıcı bulunamadı" });
    }
    res.sendFile(`${(user as any).id}.jpg`, {
      root: "src/uploads/data/uploadUserProfilePhoto/",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Bir hata oluştu" });
  }
};

const updateProfile = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const user = await Users.findByPk(id);
    if (!user) {
      return res.status(404).json({ message: "Kullanıcı bulunamadı" });
    }
    const updatedUser = await user.update(req.body);
    return res.status(200).json({
      status: true,
      message: "Profil bilgileri güncellendi",
      updatedUser,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Bir hata oluştu" });
  }
};

const deleteUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const user = await Users.findByPk(id);
    if (!user) {
      return res.status(404).json({ message: "Kullanıcı bulunamadı" });
    }
    await user.destroy();
    return res.status(200).json({ message: "Kullanıcı silindi" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Bir hata oluştu" });
  }
};

export {
  signup,
  login,
  getUsers,
  uploadUserProfilePhoto,
  getUserProfilePhoto,
  updateProfile,
  deleteUser,
};
