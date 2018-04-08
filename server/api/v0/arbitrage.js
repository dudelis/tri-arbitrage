const arbitrageRouter = require('express').Router();

const { getArbitrageTable } = require('./../../arbitrage/stage1_simple');

arbitrageRouter.get('/simple', async (req, res)=>{
    try{
        const arbitrageTable = await getArbitrageTable();
        res.send({arbitrageTable});
    }catch(e){
        res.status(400).send(e);
    }
});
module.exports = { arbitrageRouter }