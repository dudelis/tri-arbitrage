const router  = require('express').Router();

const { Log } = require('../../models/log');


// ?limit='number' - returns the latest number of certain items
router.get('/', async (req, res)=>{
    try{
        const limit = parseInt(req.query.limit) || 1000;
        const logs = await Log.find().sort({timestamp: -1}).limit(limit);
        res.status(200).send(logs);
    }catch(e){
        res.status(400).send(e);
    }
});

module.exports = {logRouter: router};