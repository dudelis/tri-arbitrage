const _ = require('lodash');
const exchangeRouter = require('express').Router();
const {ObjectID} = require('mongodb');

const {Exchange} = require('../../models/exchange');

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
exchangeRouter.delete('/:id', (req, res)=>{
    const id = req.params.id;
    if (!ObjectID.isValid(id)){
        return res.status(404).send();
    };
    Exchange.findByIdAndRemove(id).then((exchange)=>{
        if (exchange){
            res.send({exchange});
        } else{
            res.status(404).send();
        }
    }, (e)=>{
        res.status(400).send();
    });
});
exchangeRouter.patch('/:id', (req, res)=>{
    const id = req.params.id;
    if (!ObjectID.isValid(id)){
        return res.status(404).send();
    };
    let exch = _.pick(req.body, ['name','ccxt_id','includeIntoQuery', 'localCurrency'])
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