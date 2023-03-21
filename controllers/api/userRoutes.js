const express = require('express');
const router = express.Router();
const {User} = require('../../models');


router.post('/', async (req, res) => {
  try{
    const dbUserData = await User.create(req.body);
  

  // commented out blog data
  // User.findAll({
  //   attributes: { exclude: ['password'] }
  // })
    .then(dbUserData => res.json(dbUserData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
  };


router.post('/login', (req, res) => {
  User.findOne({
    where: {
      email: req.params.email
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
      if (!dbUserData) {
        return res.status(404).json({ message: 'No User found!' });
      
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
