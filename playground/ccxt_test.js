// Первоочередные площадки: ACX, Bitstamp, BL3P, BITMARKET, BX THAILAND,
// Bitcoin Indonesia, итого 6 для начала хватит
// Только BTC к EUR USD PLN AUD THB IDR

const ccxt = require('ccxt');

// var kraken = ccxt.kraken();
// console.log(kraken.name);
// kraken.name = 'hello';
// console.log(kraken.name);
// var kraken1 = new ccxt.kraken();
// console.log(kraken1.name);

// console.log(ccxt)


var exchangeName = 'bittrex';


// (async ()=>{
//     let acx = new ccxt.acx();
//     let markets = await acx.load_markets();
//     let tickers = await acx.fetchTicker('BTC/AUD');
//     console.log(acx.id, tickers)
// })()

// (async ()=>{
//     let bitstamp = new ccxt.bitstamp();
//     let markets = await bitstamp.load_markets();
//     //console.log(markets);
//     let ticker = await bitstamp.fetchTicker('BTC/USD');
//     console.log(bitstamp.id, ticker)
// })()


(async ()=>{
    
    let exchange = new ccxt[exchangeName]();
    let markets = await exchange.load_markets();
    
    console.log(Object.keys(markets));
    // let ticker = await exchange.fetchTicker('BTC/USDT');
    // console.log(ticker);
})()