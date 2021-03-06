const router = require('express').Router();
const {ObjectID} = require('mongodb');


const {start, stop, setInterval, syncExchanges, getSettings, syncExchange} = require('./../../aggregator/crypto-aggregator');

router.get('/crypto/settings', async (req, res)=>{
    try{
        const settings = getSettings();
        res.send({settings});
    }catch(e){
        res.status(400).send(e);
    }
});

router.post('/crypto/setinterval/:interval', async(req, res)=>{
    try{
        const interval = parseInt(req.params.interval);
        if (typeof interval === 'number'){
            const changedInterval = setInterval(interval);
            res.status(200).send({interval:changedInterval});
        } else{
            res.status(400).send()
        }
    } catch(e){
        res.status(400).send(e);
    }
});
router.get('/crypto/start', async(req, res)=>{
    try{
        start();
        res.status(200).send();
    } catch(e){
        res.status(400).send(e);
    }
});
router.get('/crypto/stop', async(req, res)=>{
    try{
        stop();
        res.status(200).send();
    } catch(e){
        res.status(400).send(e);
    }
});
router.get('/crypto/sync', async(req, res)=>{
    try{
        syncExchanges();
        res.status(200).send();
    } catch(e){
        res.status(400).send(e);
    }
});
router.get('/crypto/exchange/:id', async(req, res)=>{
    try{
        const id = req.params.id;
        if(!ObjectID.isValid(id)){
            res.status(400).send({message:'Id is not valid'});    
        }
        const message = await syncExchange(id);
        if (message.e){
            res.status(400).send(message);    
        } else{
            res.status(200).send(message);
        }        
    } catch(e){
        res.status(400).send(e);
    }
});

module.exports = { aggregatorRouter: router }