const api_router = require('express').Router();

const { v0router } = require('./v0');

api_router.use('/v0', v0router);
api_router.get('/', (req, res) => {
  res.status(200).json({ message: '/Api is Connected!' });
});

module.exports = {api_router};