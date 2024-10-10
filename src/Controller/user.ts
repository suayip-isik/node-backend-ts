import { Request, Response } from "express";
import db from "../Model";
const { Users } = db;

const getAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await Users.findAll();
    return res.status(200).send(users);
  } catch (error) {
    console.log(error);
  }
};

const uploadProfilePhoto = async (req: Request, res: Response) => {
  const { userId } = req.params;
  try {
    const user = await Users.findByPk(userId);
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

const fetchUserProfilePhoto = async (req: Request, res: Response) => {
  const { userId } = req.params;
  try {
    const user = await Users.findByPk(userId);
    if (!user) {
      return res.status(404).json({ message: "Kullanıcı bulunamadı" });
    }
    res.sendFile(`${(user as any).id}.jpg`, {
      root: "src/uploads/data/profile-photo/",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Bir hata oluştu" });
  }
};

const updateUserProfile = async (req: Request, res: Response) => {
  const { userId } = req.params;
  try {
    const user = await Users.findByPk(userId);
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "Kullanıcı bulunamadı" });
    }
    const updatedUser = await user.update(req.body);
    return res.status(200).json({
      success: true,
      message: "Profil bilgileri güncellendi",
      updatedUser,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Bir hata oluştu" });
  }
};

const deleteUserAccount = async (req: Request, res: Response) => {
  const { userId } = req.params;
  try {
    const user = await Users.findByPk(userId);
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "Kullanıcı bulunamadı" });
    }
    await user.destroy();
    return res
      .status(200)
      .json({ success: true, message: "Kullanıcı silindi" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: "Bir hata oluştu" });
  }
};

export {
  getAllUsers,
  uploadProfilePhoto,
  fetchUserProfilePhoto,
  updateUserProfile,
  deleteUserAccount,
};
