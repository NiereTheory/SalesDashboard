const routes = require('express').Router();

// Use this to import and then add another use statement

const salesRoutes = require('./sales/index.sales');
const newRoutes = require('./new/index.new');
const loginRoutes = require('./login/index.login');

routes.use('/sales', salesRoutes);
routes.use('/new', newRoutes);
routes.use('/login', loginRoutes);

module.exports = routes;
