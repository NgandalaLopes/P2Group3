const router = require('express').router();

const apiRoutes = require('./api');
const homeRoutes = require('./home_routes.js');


router.use('/', homeRoutes);
router.use('/api', apiRoutes);

module.exports = router;