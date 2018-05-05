const ccxt = require('ccxt');
const router = require('express').Router();



router.get('/exchanges', async (req, res)=>{
    try{
        const exchanges = ccxt.exchanges;
        res.send({exchanges});
    }catch(e){
        res.status(400).send(e);
    }
});

router.get('/exchange/:id', async (req, res)=>{
    try{
        const id = req.params.id;
        const exchange = new ccxt[id];
        res.send({exchange});
    }catch(e){
        res.status(400).send(e);
    }
});
router.get('/exchange/:id/markets', async (req, res)=>{
    try{
        const id = req.params.id;
        const exchange = new ccxt[id];
        const markets = await exchange.load_markets();
        const keys = Object.keys(markets);
        keys.sort((a,b)=>{
            return a>b ? 1: -1;
        });
        res.send({markets: keys});
    }catch(e){
        res.status(400).send(e);
    }
});
router.get('/exchange/:id/market/:marketid', async (req, res)=>{
    try{
        const id = req.params.id;
        const marketid = req.params.marketid;
        const exchange = new ccxt[id];
        const markets = await exchange.load_markets();
        const market = markets[marketid];
        res.send({market});
    }catch(e){
        res.status(400).send(e);
    }
});



module.exports = { ccxtRouter: router }