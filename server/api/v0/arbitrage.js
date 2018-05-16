const arbitrageRouter = require('express').Router();

const simple = require('./../../arbitrage/stage1_simple');
const weighted = require('./../../arbitrage/stage2_weighted');

arbitrageRouter.get('/simple/:crypto', async (req, res)=>{
    try{
        const cc = req.params.crypto;
        const arbitrageTable = await simple.getArbitrageTable(cc);
        res.send({arbitrageTable});
    }catch(e){
        res.status(400).send(e);
    }
});

arbitrageRouter.get('/convertedtickers/:crypto', async (req, res)=>{
    try{
        const cc = req.params.crypto;
        const data = await simple.getConvertedTickers(cc);
        res.send({data});
    }catch(e){
        res.status(400).send(e);
    }
});

arbitrageRouter.get('/weighted/:crypto/:volume', async (req, res)=>{
    try{
        const cc = req.params.crypto;
        const vol = parseFloat(req.params.volume);
        const arbitrageTable = await weighted.getArbitrageTable(cc, vol);
        res.send({arbitrageTable});
    }catch(e){
        res.status(400).send(e);
    }
});

arbitrageRouter.get('/convertedorderbook/:crypto/:volume', async (req, res)=>{
    try{
        const cc = req.params.crypto;
        const vol = parseFloat(req.params.volume);
        console.log(vol);
        const data = await weighted.getConvertedOrderbook(cc, vol);
        res.send({data});
    }catch(e){
        res.status(400).send(e);
    }
});



module.exports = { arbitrageRouter }