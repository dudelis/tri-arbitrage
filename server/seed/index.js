// Первоочередные площадки: ACX, Bitstamp, BL3P, BITMARKET, BX THAILAND,
// Bitcoin Indonesia, итого 6 для начала хватит
// Только BTC к EUR USD PLN AUD THB IDR

const {ObjectID} = require('mongodb');

const {Exchange} = require('./../models/exchange');
const config = require('./../../config');

const exchanges = [{
    name: 'ACX',
    ccxt_id: 'acx',
    localCurrency: 'AUD',
    includeIntoQuery: true,
    symbols:['BTC/AUD']
},{
    name: 'Bitstamp',
    ccxt_id: 'bitstamp',
    localCurrency: 'USD',
    includeIntoQuery: true,
    symbols:['BTC/USD']
},{
    name: 'BL3P',
    ccxt_id: 'bl3p',
    localCurrency: 'EUR',
    includeIntoQuery: true,
    symbols: ['BTC/EUR']
},{
    name: 'BITMARKET',
    ccxt_id: 'bitmarket',
    localCurrency: 'PLN',
    includeIntoQuery: true,
    symbols: ['BTC/PLN']
},{
    name: 'BX THAILAND',
    ccxt_id: 'bxinth',
    localCurrency: 'THB',
    includeIntoQuery: true,
    symbols:['BTC/THB']
},{
    name: 'Bitcoin.co.id',
    ccxt_id: 'bitcoincoid',
    localCurrency: 'IDR',
    includeIntoQuery: true,
    symbols:['BTC/IDR']
}]


const populateExchanges = async()=>{
    try{
        var foundExchanges = await Exchange.find();
        if (!foundExchanges || foundExchanges.length ===0){
            await Exchange.insertMany(exchanges);
            return exchanges;
        } else{
            return foundExchanges;
    }}catch(e){
        console.log(e);
    }
}

module.exports = {populateExchanges, exchanges}