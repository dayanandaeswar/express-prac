const logger = require('../../logger/logger');
const { getConnection, closeConnection } = require('../db/mysql.db.connection');


async function getEmployeesRepo(pageNumber, size) {

    try {
        if (logger.isDebugEnabled()) {
            logger.debug('*****Repo starts***********');
        }
        const connection = await getConnection();
        const [results, fields] = await connection.query(`SELECT * FROM employees limit ${pageNumber * size}, ${size}`);
        await closeConnection(connection);
        if (logger.isDebugEnabled()) {
            logger.debug('*****Repo ends***********');
        }
        return results
    } catch (err) {
        logger.error(err);
        throw err;
    }

}

module.exports = {
    getEmployeesRepo
}
