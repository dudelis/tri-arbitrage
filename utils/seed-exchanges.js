// Первоочередные площадки: ACX, Bitstamp, BL3P, BITMARKET, BX THAILAND,
// Bitcoin Indonesia, итого 6 для начала хватит
// Только BTC к EUR USD PLN AUD THB IDR

const {ObjectID} = require('mongodb');

const {Exchange} = require('../server/models/exchange');


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
    name: 'INDODAX',
    ccxt_id: 'indodax',
    localCurrency: 'IDR',
    includeIntoQuery: true,
    symbols:['BTC/IDR']
}];

// (function(){
//     console.log(exchanges);
// })();

const populate = async() =>{
    try{
        var foundExchanges = await Exchange.find();
        if (!foundExchanges || foundExchanges.length ===0){
            await Exchange.insertMany(exchanges);
        }
    }catch(e){
        console.log(e);
    }
};
module.exports = {populate}