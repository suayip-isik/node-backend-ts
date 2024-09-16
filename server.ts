import express, { Application } from "express";
import { PORT } from "./src/Config";
import { userRouter } from "./src/Router";
import cookieParser from "cookie-parser";
import { verifyJwt } from "./src/Middleware";

const app: Application = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(verifyJwt);
app.use("/api/v1/user", userRouter);

app.listen(PORT, () => console.log(`Server is connected on ${PORT}`));

export default app;
