const express = require('express');
const router = require('express').Router();

const router_v0 = require('./v0'); 
// const exchangeRouter = require('./exchange-route');
// const currencyRouter = require('./currency-route');
// const tickerRouter = require('./ticker-route');


router.use('/v0', router_v0.router);

router.get('/', (req, res) => {
  res.status(200).json({ message: '/Api is Connected!' });
});



module.exports = {router};