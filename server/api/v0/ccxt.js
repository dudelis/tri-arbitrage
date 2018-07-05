const ccxt = require('ccxt');
const router = require('express').Router();

router.get('/exchanges', async (req, res)=>{
    try{
        const data = ccxt.exchanges;
        res.send(data);
    }catch(e){
        res.status(400).send(e);
    }
});

router.get('/exchange/:id', async (req, res)=>{
    try{        
        const id = req.params.id;
        if (ccxt.exchanges.includes(id)){
            const exchange = new ccxt[id];
            return res.send({exchange});
        } else{
            res.status(404).send("Exchange with this ID does not exist");    
        }
    }catch(e){
        res.status(400).send(e);
    }
});
router.get('/exchange/:id/markets', async (req, res)=>{
    try{
        const id = req.params.id;
        if (!ccxt.exchanges.includes(id)){
            return res.status(404).send("Exchange with this ID does not exist");
        }
        const exchange = new ccxt[id];
        const markets = await exchange.load_markets();
        const keys = Object.keys(markets);
        keys.sort((a,b)=>{
            return a>b ? 1: -1;
        });
        res.send(keys);
    }catch(e){
        res.status(400).send(e);
    }
});
router.get('/exchange/:id/market/:marketid', async (req, res)=>{
    try{
        const id = req.params.id;
        const marketid = req.params.marketid;
        if (!ccxt.exchanges.includes(id)){
            return res.status(404).send(`Exchange with id ${id} does not exist`);
        }
        const exchange = new ccxt[id];
        const markets = await exchange.load_markets();
        const market = markets[marketid];
        if (!market){
            return res.status(404).send(`Market ${marketid} is not found for exchange ${id}`);
        }
        res.send({market});
    }catch(e){
        res.status(400).send(e);
    }
});



module.exports = { ccxtRouter: router }