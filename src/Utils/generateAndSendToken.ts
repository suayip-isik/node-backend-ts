import { Response } from "express";
import jwt from "jsonwebtoken";

const generateAndSendToken = (user: any, res: Response) => {
  const secretKey = process.env.JWT_SECRET_KEY;
  if (!secretKey) {
    throw new Error("JWT_SECRET_KEY is not defined");
  }

  const token = jwt.sign({ userId: user.id }, secretKey, {
    expiresIn: 1 * 24 * 60 * 60 * 1000,
  });

  res.cookie("jwt", token, { maxAge: 1 * 24 * 60 * 60, httpOnly: true });
  return token;
};

export { generateAndSendToken };
