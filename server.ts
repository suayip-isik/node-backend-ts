import express from "express";
import { PORT } from "./src/Config/config";

const app = express();

// const port = 3000;

app.get("/", (req, res) => {
  res.json({ message: "Hello World!", success: true });
});

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});

export default app;
