const express = require('express');
const router = express.Router();
const sequelize = require('../../config/connection');
const {Post, User, Comment} = require('../../models');


router.get('/', async (req, res) => {
  User.findAll({
    attributes: { exclude: ['password'] }
  })
    .then(dbUserData => res.json(dbUserData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});


router.get('/:id', (req, res) => {
  User.findOne({
    attributes: { exclude: ['password'] },
    where: {
      id: req.params.id
    },
    include: [
      {
        model: Post,
        attributes: ['id', 'title', 'description', 'content','date_created','user_id'],
        include: [
          {
            model: Comment,
            attributes: ['id', 'text', 'date_created', 'user_id', 'post_id'],
            include: {
              model: User,
              attributes: ['username']
            }
          },
          {
            model: User,
            attributes: ['username']
          }
        ]
      }
    ]
  })
    .then(dbUserData => {
      if (!dbUserData) {
        res.status(404).json({ message: 'No user found with this id' });
        return;
      }
      res.json(dbUserData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.post('/', async (req, res) => {
  try {
      const dbUserData = await User.create({
          username: req.body.username,
          email: req.body.email,
          password: req.body.password
      });

      req.session.save(() => {
          req.session.user_id = dbUserData.id;
          req.session.username = dbUserData.username;
          req.session.loggedIn = true;

          res.status(200).json(dbUserData);
      });
  } catch (err) {
      console.log(err);
      res.status(500).json(err);
  }
});

module.exports = router;
