const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.render('homepage');
});

router.get('/login', (req, res) => {
    if (req.session.login) {
        res.redirect('/');
        return;
    }
    res.render('login');
});

router.get('/dashboard', (req, res) => {
    Promise.resolve()
        .then(() => {
            if (!req.session.login) {
                res.redirect('/login');
                return;
            }
            res.render('dashboard', {
                login: req.session.login,
            });
        })
        .catch((err) => {
            res.status(500).json(err);
        });
});

module.exports = router;
