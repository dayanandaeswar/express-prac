const { getEmployeesRepo } = require('../repo/employee.repo');
const logger = require('../../logger/logger');

async function getEmployeesService(pageNumber, size) {
    if (logger.isDebugEnabled()) {
        logger.debug('*****Service starts***********');
    }
    const data = await getEmployeesRepo(pageNumber, size);
    if (logger.isDebugEnabled()) {
        logger.debug('*****Service ends***********');
    }
    return data;
}

module.exports = {
    getEmployeesService
}