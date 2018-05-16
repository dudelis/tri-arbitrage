// require('./../../config/index');
// const {mongoose} = require('./../db/mongoose');

const { Ticker } = require('./../models/ticker');
const { Fiat } = require('./../models/fiat');
const logger = require('../../utils/logger');
const helper = require('./arbitrage-helper');

const baseFiat = 'USD'

const getConvertedTickers  = async (base = 'BTC')=>{
    try{
        const tickers = await Ticker.getArbitrageTickers(base);

        const fiats = await Fiat.getLatestFiats();
        const convertedTickers = tickers.map((ticker)=>{
            const quoteCurrency = ticker.symbol.split('/')[1]; //getting the quote currency
            let rate = 1;
            if (quoteCurrency !== baseFiat){
                const fiatObj = fiats.find((fiat)=>{
                    return fiat._id == baseFiat + quoteCurrency;
                });
                rate = fiatObj.rate;
            }
            return {
                tickerTimestamp : ticker.timestamp,
                bid: ticker.bid / rate,
                ask: ticker.ask / rate,
                symbol: `${base}/${baseFiat}`,
                exchangeName: ticker.exchange.name,
                exchangeId: ticker.exchange.ccxt_id
            }
        });
        return  convertedTickers;
    } catch (e){
        logger.error(`Error getting the converted tickers for ${base}`, {base, e});
    }
}

const getArbitrageTable = async (base) =>{
    try {
        const convertedTickers = await getConvertedTickers(base);
        const result = helper.buildArbitrageTable(convertedTickers);
        // convertedTickers.sort(function(a,b){
        //     if(a.exchangeName.toLowerCase() < b.exchangeName.toLowerCase()) return -1;
        //     if(a.exchangeName.toLowerCase() > b.exchangeName.toLowerCase()) return 1;
        //     return 0;
        // });
        // //creating columns
        // const columns = [{key: 'name', name: 'Exchanges'}];
        // convertedTickers.forEach(item=>{
        //     columns.push({key: item.exchangeId, name: item.exchangeName});
        // });
        // const rows = [];
        // convertedTickers.forEach(row => {
        //     const rowObj = {};
        //     rowObj['name'] = row.exchangeName;
        //     const bid = row.bid;
        //     convertedTickers.forEach(col=>{
        //         if (row.exchangeId === col.exchangeId){
        //             rowObj[col.exchangeId] = '-';    
        //         } else{               
        //             const arbitrage = helper.calculateArbitrage(bid, col.ask);
        //             rowObj[col.exchangeId] = helper.roundNumber(arbitrage, 2);
        //         }
        //     });
        //     rows.push(rowObj);
        // });
        return result;
    } catch(e){
        logger.error(`Simple - Error getting the Arbitrage table for ${base}`, {base, e});
    }
}

module.exports = {getArbitrageTable, getConvertedTickers}






