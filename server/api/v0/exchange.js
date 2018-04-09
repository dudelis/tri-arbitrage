const _ = require('lodash');
const exchangeRouter = require('express').Router();
const {ObjectID} = require('mongodb');

const { Exchange } = require('./../../models/exchange');
const { Ticker } = require('./../../models/ticker');
const { Orderbook } = require('./../../models/orderbook');

exchangeRouter.get('/', async (req, res)=>{
    try{
        const exchanges = await Exchange.find();
        res.send(exchanges);
    }catch(e){
        res.status(400).send(e);
    }
});

exchangeRouter.get('/:id', (req, res)=>{
    const id = req.params.id;
    if (!ObjectID.isValid(id)){
        return res.status(404).send();
    };
    Exchange.findById(id).then((exchange)=>{
        if (exchange){
            res.send({exchange});
        } else{
            res.status(404).send();
        }
    }, (e)=>{res.status(400).send()});
});
exchangeRouter.get('/name/:name', (req, res)=>{
    Exchange.findOne({'name':req.params.name}).then((exchange)=>{
        if (exchange){
            res.send({exchange});
        } else{
            res.status(404).send();
        }
    }, (e)=>{res.status(400).send()});
});
exchangeRouter.post('/', (req, res)=>{
    const exchange = new Exchange({
        _id: new ObjectID(),
        name: req.body.name,
        ccxt_id: req.body.ccxt_id,
        localCurrency: req.body.localCurrency,
        includeIntoQuery: req.body.includeIntoQuery,
        createdAt: new Date().getTime(),
        updatedAt: new Date().getTime()
    });
    exchange.save().then((exch)=>{
        res.send(exch);
    }, (e)=>{
        res.status(400).send(e);
    });
});
exchangeRouter.delete('/:id', async (req, res)=>{
    try{
        const id = req.params.id;
        if (!ObjectID.isValid(id)){
            return res.status(404).send();
        };
        const exchange = await Exchange.findByIdAndRemove(id);
        if (exchange)
        {
            const tickers = await Ticker.remove({'_exchange' : exchange._id});
            const orderbooks = await Orderbook.remove({'_exchange' : exchange._id});
            res.send({exchange, tickers, orderbooks});
        } else {
            res.status(404).send();
        };
    } catch (e){
        res.status(400).send();
    }
});

exchangeRouter.patch('/:id', (req, res)=>{
    const id = req.params.id;
    if (!ObjectID.isValid(id)){
        return res.status(404).send();
    };
    let exch = _.pick(req.body, ['name','ccxt_id','includeIntoQuery', 'localCurrency', 'symbols'])
    exch.updatedAt = new Date().getTime();
    Exchange.findByIdAndUpdate(id, {$set: exch}, {new:true}).then((exchange)=>{
        if(!exchange){
            return res.status(404).send();
        }
        res.send(exchange);
    }, (e)=>{
        res.status(400).send();
    })
});


module.exports = {exchangeRouter};