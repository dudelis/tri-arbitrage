const express = require('express');
const v0Router = require('express').Router();

const { exchangeRouter } = require('./exchange');
const { fiatRouter } = require('./fiat');
// const tickerAggregatorRouter = require('./ticker-aggregator');
// // const exchangeRouter = require('./exchange-route');
// // const currencyRouter = require('./currency-route');
// // const tickerRouter = require('./ticker-route');


v0Router.use('/exchange', exchangeRouter);
v0Router.use('/fiat', fiatRouter);
// router.use('/tickeraggregator', tickerAggregatorRouter.router);
// // routes.use('/currency', currencyRouter);
// // routes.use('/ticker', tickerRouter);

// router.get('/', (req, res) => {
//   res.status(200).json({ message: '/v0 is Connected!' });
// });



module.exports = { v0Router }