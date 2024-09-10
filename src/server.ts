import express from "express";

const app = express();

const port = 3000;

app.get("/", (req, res) => {
  res.json({ message: "Hello World!", success: true });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

export default app;