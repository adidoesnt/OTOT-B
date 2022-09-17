import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();
mongoose.connect(process.env.DB_URL, { useNewUrlParser: true });
const db = mongoose.connection;
db.on("error", (error) => console.log(error));
db.on("open", () => console.log("connected to database"));

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("hello from server");
});

app.post("/", (req, res) => {
  res.send("hello from server");
});

app.put("/:id", (req, res) => {
  const id = req.params.id;
  res.send("hello from server");
});

app.delete("/:id", (req, res) => {
  const id = req.params.id;
  res.send("hello from server");
});

app.listen(8080, () => {
  console.log("server listening on port 8080");
});
