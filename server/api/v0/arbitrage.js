const arbitrageRouter = require('express').Router();

const { getArbitrageTable, getConvertedTickers } = require('./../../arbitrage/stage1_simple');

arbitrageRouter.get('/simple/:crypto', async (req, res)=>{
    try{
        const cc = req.params.crypto;
        const arbitrageTable = await getArbitrageTable(cc);
        res.send({arbitrageTable});
    }catch(e){
        res.status(400).send(e);
    }
});

arbitrageRouter.get('/convertedtickers/:crypto', async (req, res)=>{
    try{
        const cc = req.params.crypto;
        const convertedtickers = await getConvertedTickers(cc);
        res.send({convertedtickers});
    }catch(e){
        res.status(400).send(e);
    }
});
module.exports = { arbitrageRouter }