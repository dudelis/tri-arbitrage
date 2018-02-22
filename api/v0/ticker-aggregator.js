const _ = require('lodash');
const router = require('express').Router();
const {ObjectID} = require('mongodb');

const {Exchange} = require('../../models/exchange');

const tickerAggregator = require('../../server/ticker-aggregator');

router.get('/stop', async (req, res)=>{
    try{
        var item = await tickerAggregator.stop()
        res.status(200).send();
    }catch(e){
        res.status(400).send(e);
    }
});
router.get('/start', async (req, res)=>{
    try{
        var item = await tickerAggregator.start()
        res.status(200).send();
    }catch(e){
        res.status(400).send(e);
    }
});
// exchangeRouter.get('/:id', (req, res)=>{
//     var id = req.params.id;
//     if (!ObjectID.isValid(id)){
//         return res.status(404).send();
//     };
//     Exchange.findById(id).then((exchange)=>{
//         if (exchange){
//             res.send({exchange});
//         } else{
//             res.status(404).send();
//         }
//     }, (e)=>{res.status(400).send()});
// });
// exchangeRouter.get('/name/:name', (req, res)=>{
//     Exchange.findOne({'name':req.params.name}).then((exchange)=>{
//         if (exchange){
//             res.send({exchange});
//         } else{
//             res.status(404).send();
//         }
//     }, (e)=>{res.status(400).send()});
// });
// exchangeRouter.post('/', (req, res)=>{
//     var exchange = new Exchange({
//         _id: new ObjectID(),
//         name: req.body.name,
//         updateInterval: req.body.updateInterval,
//         localCurrency: req.body.localCurrency,
//         apiBaseUrl: req.body.apiBaseUrl,
//         created: new Date().getTime(),
//         changed: new Date().getTime()
//     });
//     exchange.save().then((exch)=>{
//         res.send(exch);
//     }, (e)=>{
//         res.status(400).send(e);
//     });
// });
// exchangeRouter.delete('/:id', (req, res)=>{
//     var id = req.params.id;
//     if (!ObjectID.isValid(id)){
//         return res.status(404).send();
//     };
//     Exchange.findByIdAndRemove(id).then((exchange)=>{
//         if (exchange){
//             res.send({exchange});
//         } else{
//             res.status(404).send();
//         }
//     }, (e)=>{
//         res.status(400).send();
//     });
// });
// exchangeRouter.patch('/:id', (req, res)=>{
//     var id = req.params.id;
//     if (!ObjectID.isValid(id)){
//         return res.status(404).send();
//     };
//     var exch = _.pick(req.body, ['updateInterval', 'localCurrency', 'apiBaseUrl'])
//     exch.changed = new Date().getTime();
//     Exchange.findByIdAndUpdate(id, {$set: exch}, {new:true}).then((exchange)=>{
//         if(!exchange){
//             return res.status(404).send();
//         }
//         res.send(exchange);
//     }, (e)=>{
//         res.status(400).send();
//     })
// });




module.exports = {router};