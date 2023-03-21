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

router.post('/', async (req, res) => {
  try {
      const dbUserData = await User.create({
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
