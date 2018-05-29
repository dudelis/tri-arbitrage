const { Orderbook } = require('./../models/orderbook');
const { Fiat } = require('./../models/fiat');
const logger = require('../../utils/logger');
const helper = require('./arbitrage-helper');

//baseCrypto
//volume
//0 - price
//1 - amount
const baseFiat = 'USD';

const getConvertedOrderbook = async (base='BTC', amountLimit = 0)=>{
    try{
        const ordersbooks = await Orderbook.getArbitrageOrderBooks(base);
        const fiats = await Fiat.getLatestFiats();
        const convertedOrderbooks = ordersbooks.map((item) =>{
            const rate = _getQuoteCurrencyExchangeRate(fiats, item.symbol);
            const convertedAmount = amountLimit * rate;
            const ask = _calculateAveragePrice(item.asks, convertedAmount) / rate;
            const bid = _calculateAveragePrice(item.bids, convertedAmount) / rate; 
            return {
                timestamp : item.timestamp,
                createdAt: item.createdAt,
                bid,
                ask,
                symbol: item.symbol,
                exchangeName: item.exchange.name,
                exchangeId: item.exchange.ccxt_id
            }
        });
        return convertedOrderbooks;
    }catch(e){
        logger.error(`Error getting the converted orderbooks for ${base}`, {base, e});
    }
}
const getArbitrageTable = async (base, amountLimit)=>{
    try {
        const convertedOrderbooks = await getConvertedOrderbook(base, amountLimit);
        const result = helper.buildArbitrageTable(convertedOrderbooks);
        return result;
    } catch(e){
        logger.error(`Orderbook Weighted - Error getting the Arbitrage table for ${base}`, {base, e});
    }
}
const _getQuoteCurrencyExchangeRate = (fiats, symbol)=>{
    const quoteCurrency = symbol.split('/')[1]; //getting the quote currency
    let rate = 1;
    if (quoteCurrency !== baseFiat){
        const fiatObj = fiats.find((fiat)=>{
            return fiat._id == baseFiat + quoteCurrency;
        });
        rate = fiatObj.rate;
    }
    return rate;
}

const _calculateAveragePrice = (askbid, convertedAmount)=>{
    let result = 0;
    if (_isAskbidAmountEnough(askbid, convertedAmount)){
        const reducedAskBid = _getReducedAskbid(askbid, convertedAmount);
        result = helper.weightedMean(reducedAskBid);
    }
    return result;
}
//Checks if the ask/bid items are more or equal to the convertedAmount
const _isAskbidAmountEnough = (askbid, convertedAmount)=>{
    const totalAmount = askbid.reduce((sum, current)=>{
        return sum + (current[1] * current[0]);
    },0);
    return totalAmount >= convertedAmount;
}
//Returns the asks/bids items within the converted amount.
const _getReducedAskbid = (askbid, convertedAmount)=>{
    const reducedArr = askbid.reduce((acc, item)=>{
        if (acc.totalamount <= convertedAmount){
            acc.askbids.push(item);
            acc.totalamount = acc.totalamount + item[1]*item[0];
        }
        return acc;
    },{askbids:[], totalamount: 0});
    return reducedArr.askbids;
}


module.exports = {getArbitrageTable, getConvertedOrderbook}