const app = require('express')();
const bodyParser = require('body-parser');

const logger = require('./utils/logger');
const {mongoose} = require('./lib/mongoose');
const api = require('./api');

var start = function(){
    //  Connect all our routes to our application
    //app.use(logger);
    app.use(bodyParser.json());
    app.use('/api', api.router);

    // Turn on that server!
    app.listen(process.env.PORT, () => {
    logger.info(`App listening on port ${process.env.PORT}`);
    });
};
module.exports = {start};