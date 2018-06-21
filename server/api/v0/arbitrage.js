const arbitrageRouter = require('express').Router();

const {Arbitrage} = require('./../../models/arbitrage');
const simple = require('./../../arbitrage/stage1_simple');
const weighted = require('./../../arbitrage/stage2_weighted');
//const accumulated = require('./../../arbitrage/stage3_accumulated');

arbitrageRouter.get('/simple/table-data/:crypto', async (req, res)=>{
    try{
        const cc = req.params.crypto;
        const data = await simple.getArbitrageTable(cc);
        res.send({data});
    }catch(e){
        res.status(400).send(e);
    }
});

arbitrageRouter.get('/simple/list/:crypto', async (req, res)=>{
    try{
        const cc = req.params.crypto;
        const data = await simple.getConvertedTickers(cc);
        res.send({data});
    }catch(e){
        res.status(400).send(e);
    }
});
// //Weighted Arbitrage
arbitrageRouter.get('/weighted/list/:crypto/:volume/:timestamp', async (req, res)=>{
    try{
        const crypt = req.params.crypto;
        const volume = parseFloat(req.params.volume);
        const timestamp = req.params.timestamp ? parseFloat(req.params.timestamp): new Date().getTime();
        const data  = await Arbitrage.getArbitrageList(crypt, volume, timestamp);
        res.send({data});
    }catch(e){
        res.status(400).send(e);
    }
});
arbitrageRouter.get('/weighted/table-data/:crypto/:volume/:timestamp', async (req, res)=>{
    try{
        const crypt = req.params.crypto;
        const volume = parseFloat(req.params.volume);
        const timestamp = req.params.timestamp ? parseFloat(req.params.timestamp): new Date().getTime();
        const data = await weighted.getArbitrageTable(crypt, volume, timestamp);
        res.send({data});
    }catch(e){
        res.status(400).send(e);
    }
});

module.exports = { arbitrageRouter }