const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const cookieSession = require('cookie-session');
const cookieParser = require('cookie-parser');
const logger = require('./logger/logger');

const employeeRoutes = require('./routes/employeeRoutes')();
const morganMiddleware = require('./morgan/morgan');

var app = express();
const originalSend = app.response.send;
app.response.send = function sendOverride(body) {
    this.responseBody = body;
    return originalSend.call(this, body);
}

app.use(cors());
app.use(cookieParser());
app.use(cookieSession({
    name: 'session',
    keys: ['session-id'],
    maxAge: 24 * 60 * 60
}));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(morganMiddleware);
app.use('/api', employeeRoutes);
app.get('/', (req, res) => {
    res.send('Hi, I am up!!!');
});
const port = process.env.PORT || 8080;
app.listen(port, () => {
    logger.info(`App started in port:${port}`);
})