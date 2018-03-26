const _ = require('lodash');
const fiatRouter = require('express').Router();
const {ObjectID} = require('mongodb');

const { Fiat } = require('../../models/fiat');


// ?limit='number' - returns the latest number of certain items
fiatRouter.get('/', async (req, res)=>{
    try{
        const limit = parseInt(req.query.limit);
        const fiats = await Fiat.find().sort({timestamp: -1}).limit(limit);
        res.send(fiats);
    }catch(e){
        res.status(400).send(e);
    }
});
fiatRouter.get('/:symbol', async (req, res)=>{
    try{
        const symbol = req.params.symbol;
        const limit = parseInt(req.query.limit);
        const fiat = await Fiat.find({symbol}).sort({timestamp: -1}).limit(limit);
        res.send(fiat);
    } catch(e){
        res.status(400).send(e);
    }
    
});

module.exports = {fiatRouter};