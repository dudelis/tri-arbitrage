const path = require('path');
const express = require('express');
const app = require('express')();
const bodyParser = require('body-parser');

const logger = require('../utils/logger');
const {mongoose} = require('./db/mongoose');
const {api_router} = require('./api');

var start = function(){
    //  Connect all our routes to our application
    //app.use(logger);
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());
    //API routes
    app.use('/api', api_router);
     

    app.use(express.static(path.resolve(__dirname, '../public')));
    app.get('*', function (req, res) {
        res.sendFile(path.join(__dirname, '../public', 'index.html'));
    });       

    // Turn on that server!
    app.listen(process.env.PORT, () => {
    logger.info(`App listening on port ${process.env.PORT}`);
    });
};
module.exports = {start};