const express = require('express');
const router = express.Router();
const {User} = require('../../models');


router.post('/login', async (req, res) => {
  try{
    const dbUserData = await User.findOne({where:{email:req.body.email}});

    if (!dbUserData){
      res
      .status(400)
      .json({message: 'Incorrect email or password, Try again!'});
      return;
    };


    const validPassword = await dbUserData.checkPassword(req.body.password);

    if(!validPassword){
      res
        .status(400)
        .json({message: 'Incorrect email or password, Try again!'});
      return;
    };

      req.session.save(() => {
          req.session.user_id = dbUserData.id;
          req.session.email = dbUserData.email;
          req.session.loggedIn = true;

          res.status(200).json(dbUserData);
      });
  } catch (err) {
      console.log(err);
      res.status(500).json(err);
  }
});

module.exports = router;
