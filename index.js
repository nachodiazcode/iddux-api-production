const app = require('./app')
const log = require('./utils/logger')
const config = require('./config/index')

const port = config.port ;

app.listen(config.puerto)


