const app = require('express')();

const logger = require('./utils/logger');
const {mongoose} = require('./lib/mongoose');
const routes = require('./api');

var start = function(){
    //  Connect all our routes to our application
    app.use(logger);
    app.use('/api', routes);

    // Turn on that server!
    app.listen(process.env.PORT, () => {
    logger.info(`App listening on port ${process.env.PORT}`);
    });
};
module.exports = start;