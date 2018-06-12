
const { Arbitrage } = require('./../models/arbitrage');
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
                exchange: item.exchange,
                arbitragesymbol: `${base}/${baseFiat}`
            }
        });
        return convertedOrderbooks;
    }catch(e){
        logger.error(`Error getting the converted orderbooks for ${base}`, {base, e});
    }
}
const getArbitrageTable = async (crypt, volume, timestamp)=>{
    try {
        const arbitrages = await Arbitrage.getArbitrageList(crypt, volume,timestamp);
        const exchanges = arbitrages.reduce((accumulator, arbitrage) =>{
            const found = accumulator.findIndex((item)=>{
                if (item){
                    return arbitrage.askexchange.ccxt_id === item.ccxt_id;
                } else{
                    return false;
                }                
            })
            if (found === -1){
                accumulator.push(arbitrage.askexchange);
            }
            return accumulator;
        }, []);
        exchanges.sort((a,b)=>{
            if (a.name.toLowerCase() < b.name.toLowerCase()) return -1;
            if (a.name.toLowerCase() > b.name.toLowerCase()) return 1;
            return 0;
        });
        const columns = exchanges.reduce((accumulator, exchange)=>{
            accumulator.push({key:exchange.ccxt_id, name:exchange.name });
            return accumulator;
        }, [{key: 'name', name: 'Asks   \\   Bids'}]);

        const rows = [];
        exchanges.forEach((ex_row)=>{
            const rowObj = {};
            rowObj['name'] = ex_row.name;
            exchanges.forEach((ex_col)=>{
                if (ex_row.ccxt_id === ex_col.ccxt_id){
                    rowObj[ex_col.ccxt_id] = '-';
                } else{
                    const arbitrage = arbitrages.find((element)=>{
                        return element.askexchange.ccxt_id === ex_row.ccxt_id && element.bidexchange.ccxt_id === ex_col.ccxt_id;
                    });
                    if (arbitrage){
                        rowObj[ex_col.ccxt_id] = helper.roundNumber(arbitrage.value, 2);
                    }
                }
            });
            rows.push(rowObj);
        });
        return {columns, rows};
    } catch(e){
        logger.error(`Arbitrage Weighted - Error getting the Arbitrage table for ${crypt}`, {crypt, e});
    }
}
const getArbitrageList = async (base, amountLimit) => {
    try{
        const convertedOrderbooks = await getConvertedOrderbook(base, amountLimit);
        const arbitrageList = helper.getArbitrageList(convertedOrderbooks);
        return arbitrageList;
    } catch(e){
        logger.error(`Arbitrage Weighted - Error getting the Arbitrage  for ${base}`, {base, e});
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


module.exports = {getArbitrageTable, getArbitrageList, getConvertedOrderbook}