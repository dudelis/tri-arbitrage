const tickerRouter = require('express').Router();

const { Ticker } = require('../../models/ticker');


// ?limit='number' - returns the latest number of certain items
tickerRouter.get('/', async (req, res)=>{
    try{
        const limit = parseInt(req.query.limit);
        const tickers = await Ticker.find().sort({timestamp: -1}).limit(limit);
        res.send(tickers);
    }catch(e){
        res.status(400).send(e);
    }
});
tickerRouter.get('/:symbol', async (req, res)=>{
    try{
        const symbol = req.params.symbol;
        const limit = parseInt(req.query.limit);
        const fiat = await Fiat.find({symbol}).sort({timestamp: -1}).limit(limit);
        res.send(fiat);
    } catch(e){
        res.status(400).send(e);
    }
    
});

module.exports = {tickerRouter};