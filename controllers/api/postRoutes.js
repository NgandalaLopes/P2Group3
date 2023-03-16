const express = require('express');
const router = express.Router();
const Post = require('../models/Post');

// CREATE A NEW POST
router.post('/', async (req, res) => {
  const { title, content, author } = req.body;
  try {
    const post = new Post({
      title,
      content,
      author
    });
    await post.save();
    res.status(200).json(post); // return the newly created post
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;