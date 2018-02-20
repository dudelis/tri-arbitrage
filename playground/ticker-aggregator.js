require('../config/index');
const {mongoose} = require('../server/db/mongoose');
const aggregator = require('./../server/tickerAggregator');


aggregator.startAggregator();