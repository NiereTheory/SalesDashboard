const routes = require('express').Router();

// Use this to import and then add another use statement

const salesRoutes = require('./sales/index.sales');
const newRoutes = require('./new/index.new');

routes.use('/sales', salesRoutes);
routes.use('/new', newRoutes);

module.exports = routes;
