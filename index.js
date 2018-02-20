require('./config');

const async = require('async');

const server = require('./server');


async.series([
    // function initializeDBConnection(callback) {
    //   require('./config/initializers/database')(callback);
    // },
    function startServer(callback) {
      server(callback);
    }]
        // function(err) {
    //   if (err) {
    //     logger.error('[APP] initialization failed', err);
    //   } else {
    //     logger.info('[APP] initialized SUCCESSFULLY');
    //   }
    // }
  );