const Post = require("../models/Post");

// Get all posts
module.exports.getAllPosts = async (req, res) => {
  const posts = await Post.find();
  res.send(posts);
};

// Get a post by its ID
module.exports.getPost = async (req, res) => {
  const postId = req.params.id;
  try {
    const post = await Post.findOne({ _id: postId });
    res.send(post);
  } catch (e) {
    res.status(404).send("Blog not found");
  }
};

// Create new post
module.exports.newPost = async (req, res) => {
  const input = {
    title: req.body.title,
    content: req.body.content,
  };
  const post = new Post(input);
  await post.save();
  res.send(post);
};

// Update a post
module.exports.updatePost = async (req, res) => {
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
};

// Delete post from DB
module.exports.deletePost = async (req, res) => {
  const postId = req.params.id;
  try {
    await Post.deleteOne({ _id: postId });
    res.status(204).send();
  } catch (e) {
    res.status(404).send({ error: "Post doesn't exist" });
  }
};
