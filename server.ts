import express, { Application } from "express";
import { PORT } from "./src/Config";
import { authRouter, userRouter } from "./src/Router";
import cookieParser from "cookie-parser";
import { verifyJwt } from "./src/Middleware";
import db from "./src/Model"; // *

const app: Application = express();

app.disable("x-powered-by");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(verifyJwt);
app.use("/api/v1/user", userRouter);
app.use("/api/v1/auth", authRouter);

// WARNING: only for testing
// db.sequelize.sync({ force: true }).then(() => {
//   console.log("db has been re sync");
// });

app.listen(PORT, () => console.log(`Server is connected on ${PORT}`));

export default app;
