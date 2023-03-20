const express = require('express');
const router = express.Router();
const sequelize = require('../../config/connection');
const {Post, User, Comment} = require('../../models');

// Get all comments
router.get('/', async (req, res) => {
    try {
        const commentData = await Comment.findAll();
        res.status(200).json(commentData);
    } catch (err) {
        res.status(500).json(err);
    }
});

// Create a new comment
router.post('/', async (req, res) => {
    try {
        const newComment = await Comment.create({
            content: req.body.content,
            user_id: req.session.user_id,
            post_id: req.body.post_id
        });
        res.status(200).json(newComment);
    } catch (err) {
        res.status(500).json(err);
    }
});

// Update a comment
router.put('/:id', async (req, res) => {
    try {
        const updatedComment = await Comment.update(
            {content: req.body.content},
            {where: {id: req.params.id}}
        );
        res.status(200).json(updatedComment);
    } catch (err) {
        res.status(500).json(err);
    }
});

// Delete a comment
router.delete('/:id', async (req, res) => {
    try {
        const deletedComment = await Comment.destroy({
            where: {id: req.params.id}
        });
        res.status(200).json(deletedComment);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;
