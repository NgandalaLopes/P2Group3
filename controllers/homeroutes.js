const express = require('express');
const router = express.Router();



router.get('/', async (req, res) => {
        res.render('homepage');
    });

 
router.get('/login', async (req, res) => {
            res.render('login');
      });

router.get('/dashboard', async (req,res) => {
    res.render('dashboard', {
        login:req.session.login,
    })
});
    
    module.exports = router;
