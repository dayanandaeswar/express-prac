const express = require('express');
const logger = require('../logger/logger');
const { getEmployeesService } = require('../employees/service/employee.service');
const { log } = require('winston');

const employees = [{ id: 1, name: 'dayananda' }, { id: 2, name: 'pushpa' }, { id: 3, name: 'Keerthana' }, { id: 4, name: 'Vikramadhitya' }];

const routes = () => {
    logger.info('Employee router loaded');
    const apiRoute = express.Router();
    apiRoute
        .route('/employees')
        .get(async (req, res) => {
            if (logger.isDebugEnabled()) {
                logger.debug('*****Controller Starts***********');
            }
            const pageNumber = req.query.pageNo || 0
            const size = req.query.size || 10
            const emp = await getEmployeesService(pageNumber, size);
            if (logger.isDebugEnabled()) {
                logger.debug('*****Controller ends***********');
            }
            return res.json(emp);
        });

    return apiRoute;
}
module.exports = routes;