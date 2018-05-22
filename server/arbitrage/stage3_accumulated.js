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
        const accumulatedOrderbooks = ordersbooks.map((item) =>{
            item.accask = _calculateAccumulatedAmount(volume, item.asks);
            item.accbid = _calculateAccumulatedAmount(volume, item.bids);
            return item;
        });
        const fiats = await Fiat.getLatestFiats();        
        const convertedOrderbooks = accumulatedOrderbooks.map((ob)=>{
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
                bid: ob.accask / rate,
                ask: ob.accbid / rate,
                accask: ob.accask,
                accbid: ob.accbid,
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

const _calculateAccumulatedAmount = (volume, askbid)=>{
    let result = 0;
    if (_isVolumeEnough(volume, askbid)){
        result = helper.absoluteAmount(askbid, volume);
    }
    return result;
}
const _isVolumeEnough = (volume, askbid)=>{
    const containedVolume = askbid.reduce((sum, current)=>{
        return sum + current[1];
    },0);
    return containedVolume >= volume;
}

const test = async ()=>{
    try{
        const t = await getConvertedOrderbook('BTC', 10);
        console.log(JSON.stringify(t, undefined, 2));
    } catch(e){
        console.log(e);
    }
}
test();

module.exports = {getArbitrageTable, getConvertedOrderbook}