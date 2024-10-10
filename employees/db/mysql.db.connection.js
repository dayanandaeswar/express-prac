const mysql = require('mysql2/promise');

async function getConnection() {
    const connection = await mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'root',
        database: 'employees'
    });
    return connection;

}
async function closeConnection(connection) {
    try {
        await connection.end()
    } catch (err) {

    }
}

module.exports = {
    getConnection,
    closeConnection
}