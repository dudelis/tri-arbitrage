const express = require('express');
const api_router = require('express').Router();
const { v0Router } = require('./v0');

api_router.use('/v0',v0Router);

api_router.get('/', (req, res) => {
  res.status(200).json({ message: '/Api is Connected!' });
});

module.exports = {api_router};