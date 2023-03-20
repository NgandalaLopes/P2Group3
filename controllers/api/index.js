const router = require('express').Router();
const userRoutes = require('./userRoutes');
const postRoutes = require('./postRoutes');
const commentRoutes = require('./commentRoutes');


// unsure what if need to add other route files
router.use('/users', userRoutes);

module.exports = router;