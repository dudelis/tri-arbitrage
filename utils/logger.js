const fs = require('fs');
const winston = require('winston');
require('winston-daily-rotate-file');
require('winston-mongodb');

const tsFormat = () => (new Date()).toISOString();
const logDir = 'logs';

if (!fs.existsSync(logDir)) {
    fs.mkdirSync(logDir);
  }
winston.emitErrs = true;

var logger = new winston.Logger({
    transports: [
        new winston.transports.DailyRotateFile({
            filename: './logs/log',
            level: process.env.NODE_ENV === 'development' ? 'debug' : 'info',
            handleExceptions: true,
            json: true,
            maxsize: 5242880, //5MB
            maxFiles: 5,
            timestamp: tsFormat,
            prepend: true
        }),
        new winston.transports.Console({
            level: process.env.NODE_ENV === 'development' ? 'debug' : 'info',
            handleExceptions: true,
            json: true,
            colorize: true,
            timestamp: tsFormat
        }),
        new winston.transports.MongoDB({
            level: process.env.NODE_ENV === 'development' ? 'debug' : 'info',
            db: process.env.MONGODB_URI,
            storeHost: true,
            tryReconnect: true
        })
    ],
    exitOnError: false
});

module.exports = logger;
