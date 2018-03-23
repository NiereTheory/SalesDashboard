const routes = require('express').Router();

// Use this to import and then add another use statement

const empRoutes = require('./employees/index.employees');
const regionRoutes = require('./regions/index.regions');
const salesRoutes = require('./sales/index.sales');

routes.use('/employees', empRoutes);
routes.use('/regions', regionRoutes);
routes.use('/sales', salesRoutes);

module.exports = routes;
