const { createLogger, format, transports } = require('winston')
const moment = require('moment')

const log = createLogger({
   
    format: format.combine(
        format.simple(),
        format.colorize({all: true}),
        format.timestamp( {format: 'DD/MM/YYYY HH:mm'})
    ),
    transports: [
        new transports.Console({
            level: 'info',
            colorize: true,
            format: format.combine(
                format.simple(),
                format.timestamp(),
                format.printf(info => `${info.level} : ${info.message} | ${info.timestamp}`)
            )
        })
    ]
    
})

module.exports = log
