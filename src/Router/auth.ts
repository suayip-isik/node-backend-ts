import express, { Router } from "express";
import { login, logout, registerUser } from "../Controller";
import { validateUser } from "../Middleware";

const authRouter: Router = express.Router();

authRouter.post("/login", login);

authRouter.post("/register", validateUser, registerUser);

authRouter.post("/logout", logout);

export { authRouter };
