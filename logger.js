const { createLogger , format, transports } = require("winston");
const DailyRatateFile = require('winston-daily-rotate-file')
const logger = createLogger({
    level  : 'info',
    format : format.combine(
        format.timestamp(),
        format.printf(({timestamp , level , message}) => {
            return `${timestamp} [${level}] : ${message}`
        })
    ),
    transports : [
        new transports.Console(),
        new DailyRatateFile({
            filename : 'log/%DATE%-combined.log',
            datePattern : 'YYYY-MM-DD',
            maxSize : '20mb',
            maxFiles : '7d'
        })
    ]
})

module.exports = logger