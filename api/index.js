const express = require('express');
const router = require('express').Router();

//const router_v0 = require('./v0'); 

router.get('/', (req, res) => {
  res.status(200).json({ message: '/Api is Connected!' });
});



module.exports = {router};