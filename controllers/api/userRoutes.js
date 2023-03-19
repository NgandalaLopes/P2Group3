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
          attributes: ['id', 'title', 'description', 'content','date_created','user_id']
        }
    });