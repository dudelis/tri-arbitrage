require('./../../config/index');
const {mongoose} = require('./../db/mongoose');

const { Orderbook } = require('./../models/orderbook');
const { Fiat } = require('./../models/fiat');
const logger = require('../../utils/logger');
const helper = require('./arbitrage-helper');

//baseCrypto
//volume
//0 - price
//1 - amount
const baseFiat = 'USD';

const getConvertedOrderbook = async (base='BTC', volume = 0)=>{
    try{
        const ordersbooks = await Orderbook.getArbitrageOrderBooks(base);
        const averageOrderbooks = ordersbooks.map((item) =>{
            item.avgask = _calculateAveragePrice(volume, item.asks);
            item.avgbid = _calculateAveragePrice(volume, item.bids);
            return item;
        });
        
        const fiats = await Fiat.getLatestFiats();        
        const convertedOrderbooks = averageOrderbooks.map((ob)=>{
            const quoteCurrency = ob.symbol.split('/')[1]; //getting the quote currency
            let rate = 1;
            if (quoteCurrency !== baseFiat){
                const fiatObj = fiats.find((fiat)=>{
                    return fiat._id == baseFiat + quoteCurrency;
                });
                rate = fiatObj.rate;
            }
            return {
                timestamp : ob.timestamp,
                createdAt: ob.createdAt,
                bid: ob.avgbid / rate,
                ask: ob.avgask / rate,
                avgask: ob.avgask,
                avgbid: ob.avgbid,
                symbol: `${base}/${baseFiat}`,
                exchangeName: ob.exchange.name,
                exchangeId: ob.exchange.ccxt_id
            }
        });
        return convertedOrderbooks;
    }catch(e){
        logger.error(`Error getting the converted orderbooks for ${base}`, {base, e});
    }
}
const getArbitrageTable = async (base, volume)=>{
    try {
        const convertedOrderbooks = await getConvertedOrderbook(base, volume);
        const result = helper.buildArbitrageTable(convertedOrderbooks);
        return result;
    } catch(e){
        logger.error(`Orderbook Weighted - Error getting the Arbitrage table for ${base}`, {base, e});
    }
}

const _calculateAveragePrice = (volume, askbid)=>{
    let result = 0;
    if (_isVolumeEnough(volume, askbid)){
        const reducedAskBid = _reduceAskBid(volume, askbid);
        result = helper.weightedMean(reducedAskBid);
    }
    return result;
}
const _isVolumeEnough = (volume, askbid)=>{
    const containedVolume = askbid.reduce((sum, current)=>{
        return sum + current[1];
    },0);
    return containedVolume >= volume;
}
const _reduceAskBid = (volume, askbid)=>{
    const reducedArr = askbid.reduce((acc, item)=>{
        if (acc.vol <= volume){
            acc.askbids.push(item);
            acc.vol = acc.vol + item[1];
        }
        return acc;
    },{askbids:[], vol: 0});
    return reducedArr.askbids;
}


module.exports = {getArbitrageTable, getConvertedOrderbook}