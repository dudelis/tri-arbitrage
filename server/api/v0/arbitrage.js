const arbitrageRouter = require('express').Router();

const {Arbitrage} = require('./../../models/arbitrage');
const simple = require('./../../arbitrage/stage1_simple');
const weighted = require('./../../arbitrage/stage2_weighted');
//const accumulated = require('./../../arbitrage/stage3_accumulated');

arbitrageRouter.get('/simple/:crypto', async (req, res)=>{
    try{
        const cc = req.params.crypto;
        const data = await simple.getArbitrageTable(cc);
        res.send({data});
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
// //Weighted Arbitrage
arbitrageRouter.get('/weighted/:crypto/:volume/:timestamp', async (req, res)=>{
    try{
        const crypt = req.params.crypto;
        const volume = parseFloat(req.params.volume);
        const timestamp = parseFloat(req.params.timestamp);
        const data  = await Arbitrage.getArbitrageList(crypt, volume, timestamp);
        res.send({data});
    }catch(e){
        res.status(400).send(e);
    }
});
arbitrageRouter.get('/weighted-table/:crypto/:volume/:timestamp', async (req, res)=>{
    try{
        const crypt = req.params.crypto;
        const volume = parseFloat(req.params.volume);
        const timestamp = parseFloat(req.params.timestamp);
        const data = await weighted.getArbitrageTable(crypt, volume, timestamp);
        res.send({data});
    }catch(e){
        res.status(400).send(e);
    }
});
// arbitrageRouter.get('/weighted-arbitrage/:crypto/:amount', async (req, res)=>{
//     try{
//         const crypt = req.params.crypto;
//         const amount = parseFloat(req.params.amount);
//         const arbitrageList  = await weighted.getArbitrageList(crypt, amount);
//         res.send({arbitrageList});
//     }catch(e){
//         res.status(400).send(e);
//     }
// });


arbitrageRouter.get('/convertedorderbook/:crypto/:amount', async (req, res)=>{
    try{
        const crypt = req.params.crypto;
        const amount = parseFloat(req.params.amount);
        const data = await weighted.getConvertedOrderbook(crypt, amount)
        res.send({data});
    }catch(e){
        res.status(400).send(e);
    }
});

// arbitrageRouter.get('/accumulated/:crypto/:volume', async (req, res)=>{
//     try{
//         const cc = req.params.crypto;
//         const vol = parseFloat(req.params.volume);
//         const arbitrageTable = await accumulated.getArbitrageTable(cc, vol);
//         res.send({arbitrageTable});
//     }catch(e){
//         res.status(400).send(e);
//     }
// });

// arbitrageRouter.get('/acc_convertedorderbook/:crypto/:volume', async (req, res)=>{
//     try{
//         const cc = req.params.crypto;
//         const vol = parseFloat(req.params.volume);
//         const data = await accumulated.getConvertedOrderbook(cc, vol);
//         res.send({data});
//     }catch(e){
//         res.status(400).send(e);
//     }
// });

module.exports = { arbitrageRouter }