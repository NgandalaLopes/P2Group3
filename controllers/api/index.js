const router = require('express').Router();
const userRoutes = require('./userRoutes');


// unsure what if need to add other route files
router.use('/users', userRoutes);

module.exports = router;