const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Test = require("./models/model");

function createServer() {
  dotenv.config();

  const app = express();
  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());
  app.use(cors());

  app.get("/", async (_, res) => {
    try {
      const tests = await Test.find();
      res.status(200).json(tests);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });

  app.post("/", async (req, res) => {
    const test = new Test({
      name: req.body.name,
      age: req.body.age,
    });
    try {
      const newTest = await test.save();
      res.status(201).json(newTest);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  });

  app.get("/:id", async (req, res) => {
    const id = req.params.id;
    try {
      const test = await Test.findOne({ _id: id });
      res.status(200).json(test);
    } catch (err) {
      res.status(404).json({ message: err.message });
    }
  });

  app.put("/:id", async (req, res) => {
    const id = { _id: req.params.id };
    const subscriber = {
      $set: {
        name: req.body.name,
        age: req.body.age,
      },
    };
    try {
      const test = await Test.updateOne(id, subscriber);
      res.status(200).json(test);
    } catch (err) {
      res.status(404).json({ message: err.message });
    }
  });

  app.delete("/:id", async (req, res) => {
    const id = req.params.id;
    try {
      const test = await Test.deleteOne({ _id: id });
      res.status(200).json(test);
    } catch (err) {
      res.status(404).json({ message: err.message });
    }
  });

  return app;
}

function startServer(app) {
  mongoose.connect(process.env.DB_URL, { useNewUrlParser: true });
  const db = mongoose.connection;
  db.on("error", (error) => console.log(error));
  db.on("open", () => console.log("connected to database"));

  return app.listen(8080, () => {
    console.log("server listening on port 8080");
  });
}

async function stopServer(server) {
    mongoose.connection.close(true);
    await mongoose.disconnect();
    server.close();
}

module.exports = {
    createServer,
    startServer,
    stopServer
}
