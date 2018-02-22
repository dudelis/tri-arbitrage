const express = require('express');
const router = require('express').Router();

const exchangeRouter = require('./exchange');
const tickerAggregatorRouter = require('./ticker-aggregator');
// const exchangeRouter = require('./exchange-route');
// const currencyRouter = require('./currency-route');
// const tickerRouter = require('./ticker-route');


router.use('/exchange', exchangeRouter.router);
router.use('/tickeraggregator', tickerAggregatorRouter.router);
// routes.use('/currency', currencyRouter);
// routes.use('/ticker', tickerRouter);

router.get('/', (req, res) => {
  res.status(200).json({ message: '/v0 is Connected!' });
});



module.exports = {router};