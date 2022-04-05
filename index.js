const express = require("express");
const mongoose = require("mongoose");
const posts = require("./routers/posts");

const Post = require("./models/Post");

mongoose
  .connect("mongodb://localhost:27017/acmedb", { useNewUrlParser: true })
  .then(() => {
    const app = express();

    app.use(express.json());

    app.use("/api/posts", posts);

    app.listen(3000, () => {
      console.log("Server started....");
    });
  });
