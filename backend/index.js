import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import Url from "./urlModel.js";
import validator from "validator";

dotenv.config();
const app = express();

const port = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.listen(port, function () {
  console.log(`Listening on port ${port}`);
});

const conn = await mongoose.connect(process.env.MONGO_URI);
console.log(`MongoDB Connected: ${conn.connection.host}`);

app.post("/api/shorturl", async (req, res) => {
  const url = req.body.url;
  console.log(url);
  if (!validator.isURL(url)) {
    return res.json({ error: "invalid url" });
  }
  try {
    const newURL = new Url({
      url: url,
    });
    await newURL.save();
    res.status(201).json({
      _id: newURL._id.toString(),
    });
  } catch (error) {
    res.status(500).json({ error: error });
    console.error(error);
  }
});

app.get("/api/shorturl/:_id", async (req, res) => {
  const _id = req.params._id;
  try {
    const url = await Url.findById(_id);
    if (!url) return res.status(500).json({ error: error });
    res.status(201).json({
      url: url.url,
    });
  } catch (error) {
    res.status(500).json({ error: error });
    console.error(error);
  }
});
