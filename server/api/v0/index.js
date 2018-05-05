const express = require('express');
const v0Router = require('express').Router();

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

v0Router.use('/aggregator', aggregatorRouter);
v0Router.use('/arbitrage', arbitrageRouter);
v0Router.use('/ccxt', ccxtRouter);
v0Router.use('/exchange', exchangeRouter);
v0Router.use('/fiat', fiatRouter);
v0Router.use('/log', logRouter);
v0Router.use('/ticker', tickerRouter);


module.exports = { v0Router }