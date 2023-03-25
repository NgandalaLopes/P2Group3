const router = require('express').Router();
const userRoutes = require('./userRoutes');
const appRoutes = require('./app');

router.use('/users', userRoutes);
router.use('/app', appRoutes);

module.exports = router;
