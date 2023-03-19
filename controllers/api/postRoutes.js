const express = require('express');
const router = express.Router();
const sequelize = require('../../config/connection');
const {Post, User,Comment} = require('../../models');

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

// delete a post
router.delete('/:id', async (req, res) => {
  try {
    const postData = await post.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (!postData) {
      res.status(404).json({ message: 'No post found with that id!' });
      return;
    }

    res.status(200).json(postData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;