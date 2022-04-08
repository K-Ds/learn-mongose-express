const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const posts = require("./routes/posts");

const app = express();
const port = process.env.PORT || 3000;

// connect to dataase

mongoose
  .connect("mongodb://localhost:27017/acmedb", { useNewUrlParser: true })
  .then(() => {
    console.log("Database connected");
  })
  .catch(() => {
    console.log("Not able to connect to the database");
  });

// Start Server

app.use(express.json());
app.use(bodyParser.json());

app.use("/api/posts", posts);

app.listen(port, () => {
  console.log(`Server started on port ${port}....`);
});
