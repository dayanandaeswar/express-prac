const express = require('express');
const logger = require('../logger/logger');

const employees = [{ id: 1, name: 'dayananda' }, { id: 2, name: 'pushpa' }, { id: 3, name: 'Keerthana' }, { id: 4, name: 'Vikramadhitya' }];

const routes = () => {
    logger.info('Employee router loaded');
    const apiRoute = express.Router();
    apiRoute
        .route('/employees')
        .get((req, res) => {
            return res.json(employees);
        });

    return apiRoute;
}
module.exports = routes;