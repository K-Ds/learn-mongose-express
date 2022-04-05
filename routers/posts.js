const express = require("express");
const Post = require("../models/Post");

const router = express.Router();

router.get("/", async (req, res) => {
  const posts = await Post.find();
  res.send(posts);
});

router.post("/", async (req, res) => {
  const input = {
    title: req.body.title,
    content: req.body.content,
  };
  const post = new Post(input);
  await post.save();
  res.send(post);
});

router.get("/:id", async (req, res) => {
  const postId = req.params.id;
  try {
    const post = await Post.findOne({ _id: postId });
    res.send(post);
  } catch (e) {
    res.status(404).send("Blog not found");
  }
});

router.patch("/:id", async (req, res) => {
  try {
    const postId = req.params.id;
    const post = await Post.findOne({ _id: postId });

    if (req.body.title) {
      post.title = req.body.title;
    }

    if (req.body.content) {
      post.content = req.body.content;
    }

    await post.save();
    res.send(post);
  } catch (err) {
    res.status(404).send({ error: "Post doesn't exist" });
  }
});

router.delete("/:id", async (req, res) => {
  const postId = req.params.id;
  try {
    await Post.deleteOne({ _id: postId });
    res.status(204).send();
  } catch (e) {
    res.status(404).send({ error: "Post doesn't exist" });
  }
});

module.exports = router;
