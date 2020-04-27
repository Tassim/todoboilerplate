const router = require('express').Router();
const todoRoutes = require('./todoRoutes');

// /api prepended to everyRoute inside of here
router.use('/todos', todoRoutes);

module.exports = router;
