const morgan = require('morgan');
const logger = require('../logger/logger');

morgan.token('request-body', (req) => {
    let input = {};
    if (req.method === 'GET') {
        input = req.query;
    } else {
        input = req.body;
    }
    return JSON.stringify(input);
});

morgan.token('response-body', (req, res) => {
    return res.responseBody;
});

const moranMiddleware = morgan(
    'Status\::status, URI\::url, HttpMethod\::method, RequestBody\::request-body, ResponseBody\::response-body, TimeTaken\::response-time(ms)',
    {
        stream: {
            write: (message) => logger.info(message.trim()),
        }
    }
)

module.exports = moranMiddleware;
