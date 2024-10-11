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

    const regex = /(?<=number(\":\"))(\w*(?=(\d{4})\"))/gm;

    // Alternative syntax using RegExp constructor
    // const regex = new RegExp('(?<=number(\\":\\"))(\\w*(?=(\\d{4})\\"))', 'gm')

    const str = `{"number":"9988881063"}`;

    // Reset `lastIndex` if this regex is defined globally
    // regex.lastIndex = 0;

    let m = regex.exec(str);

    console.log(str.replace(m[2], ((m2) =>
        "*".repeat(m2.length)
    )));

    logger.info(`App started in port:${port}`);
})