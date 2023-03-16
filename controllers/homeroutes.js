const express = require('express');
const router = express.Router();
const Post = require('../models/Post');



router.get('/', async (req, res) => {
    const postData = await Post.findAll().catch((err) => {
        res.json(err);
    });
        const posts = postData.map((post) => post.get({plain:true}));
        res.render('all',{ posts });

    });

 
// route to get a single post
router.get('/post/:id', async (req, res) => {
        try{ 
            const postData = await Post.findByPk(req.params.id);
            if(!postData) {
                res.status(404).json({message: 'No Post exist'});
                return;
            }
            const post = postData.get({ plain: true });
            res.render('post', post);
          } catch (err) {
              res.status(500).json(err);
          };     
      });
    
    module.exports = router;
