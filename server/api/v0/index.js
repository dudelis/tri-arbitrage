const express = require('express');
const v0router = require('express').Router();

const { aggregatorRouter } = require('./aggregator');
const { arbitrageRouter } = require('./arbitrage');
const { ccxtRouter } = require('./ccxt');
const { exchangeRouter } = require('./exchange');
const { fiatRouter } = require('./fiat');
const { logRouter } = require('./log');
const { tickerRouter } = require('./ticker');

// const tickerAggregatorRouter = require('./ticker-aggregator');
// // const exchangeRouter = require('./exchange-route');
// // const currencyRouter = require('./currency-route');
// // const tickerRouter = require('./ticker-route');

v0router.use('/aggregator', aggregatorRouter);
v0router.use('/arbitrage', arbitrageRouter);
v0router.use('/ccxt', ccxtRouter);
v0router.use('/exchange', exchangeRouter);
v0router.use('/fiat', fiatRouter);
v0router.use('/log', logRouter);
v0router.use('/ticker', tickerRouter);


module.exports = { v0router }