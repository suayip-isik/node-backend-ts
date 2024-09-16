import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

const verifyJwt = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  const allowedPaths = ["/api/v1/user/login", "/api/v1/user/signup"];
  if (allowedPaths.includes(req.path)) {
    return next();
  } else {
    if (token == null)
      return res.status(401).json({
        message: "Token gerekli",
      });

    const secretKey = process.env.JWT_SECRET_KEY;
    if (!secretKey) {
      throw new Error("JWT_SECRET_KEY is not set");
    }

    jwt.verify(token, secretKey, (err, user) => {
      if (err) return res.status(403).json({ message: "Geçersiz token" });
      // @ts-ignore
      req.user = user;
      next();
    });
  }
};

export { verifyJwt };
