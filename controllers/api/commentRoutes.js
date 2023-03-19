const express = require('express');
const router = express.Router();
const sequelize = require('../../config/connection');
const {Post, User, Comment} = require('../../models');

router.get('/', async (req, res) => {
    Comment.findAll()
    .then(dbCommentData => res.json(dbCommentData))
    .catch(err =>{
        console.log(err);
        res.status(500).json(err);
    });
});

router.post('/', async (req,res) => {
    if (req.session) {
        Comment.create({
            content
        })
    }
}
