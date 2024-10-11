const { transports, createLogger, format } = require('winston');

const logger = createLogger({
    level: process.env.LOG_LEVEL || 'info',
    format: format.combine(
        format.timestamp(),
        format.json()
    ),
    defaultMeta: {
        service: 'express-prac-svc',
        buildInfo: {
            nodeVersion: process.version,
            commitHash: process.env.COMMIT_HASH || 'local',
            version: process.env.VERSION || '1.0.0'
        }
    },
    transports: [
        new transports.Console({}),
        new transports.File({ filename: 'logs/error.log', level: 'error', timestamp: true }),
        new transports.File({ filename: 'logs/app.log', timestamp: true }),
    ]
})

module.exports = logger;