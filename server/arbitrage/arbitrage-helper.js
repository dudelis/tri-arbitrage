const absoluteAmount = (askbid, volume) => {
    const result = askbid.reduce((prev, cur)=>{
        if (prev.totalVolume < volume){
            const leftOver = volume - prev.totalVolume;
            if (leftOver>=cur[1]){
                return {
                    totalAmount: prev.totalAmount + (cur[0]*cur[1]),
                    totalVolume: prev.totalVolume + cur[1]
                }
            }else{
                return {
                    totalAmount: prev.totalAmount + (cur[0]*leftOver),
                    totalVolume: prev.totalVolume + leftOver
                }
            }
        } else{
            return {
                totalAmount: prev.totalAmount,
                totalVolume: prev.totalVolume
            };
        }
    }, {totalAmount: 0, totalVolume: 0});
    return result.totalAmount;
}

const buildArbitrageTable = (convertedData)=>{
    convertedData.sort(function(a,b){
        if(a.exchange.name.toLowerCase() < b.exchange.name.toLowerCase()) return -1;
        if(a.exchange.name.toLowerCase() > b.exchange.name.toLowerCase()) return 1;
        return 0;
    });
    //creating columns - Columns - Bids, Rows - Asks
    const columns = [{key: 'name', name: 'Bids   \\   Asks'}];
    convertedData.forEach(item=>{
        if (item.ask > 0){
            columns.push({key: item.exchange.ccxt_id, name: item.exchange.name});
        }
    });
    const rows = [];
    convertedData.forEach(row => {
        if (row.bid > 0){
            const rowObj = {};
            rowObj['name'] = row.exchange.name;
            const bid = row.bid;
            convertedData.forEach(col=>{
                if (row.exchange.ccxt_id === col.exchange.ccxt_id){
                    rowObj[col.exchange.ccxt_id] = '-';    
                } else{
                    if (col.ask>0){         
                        const arbitrage = calculateArbitrage(bid, col.ask);
                        rowObj[col.exchange.ccxt_id] = roundNumber(arbitrage, 2);
                    }
                }
            });
            rows.push(rowObj);
        }
    });
    return {
        columns,
        rows
    }
}
const getArbitrageList = (convertedData)=>{
    const arbitrageList = [];
    convertedData.forEach(askitem =>{
        if (askitem.ask > 0){
            convertedData.forEach(biditem =>{
                if (askitem.exchange.ccxt_id !== biditem.exchange.ccxt_id){
                    const item ={
                        _askExchange: askitem.exchange._id,
                        _bidExchange: biditem.exchange._id,
                        ask: askitem.ask,
                        bid: biditem. bid,
                        askSymbol: askitem.symbol,
                        bidSymbol: biditem.symbol,
                        value: calculateArbitrage(biditem.bid, askitem.ask),
                        arbitragesymbol: askitem.arbitragesymbol
                    }
                    arbitrageList.push(item);
                }
            })
        }
    })
    return arbitrageList;
}

const calculateArbitrage = (bid, ask) =>{
    return (bid / ask - 1) * 100;
}

const roundNumber = (number, precision) => {
    const shift = function (number, precision, reverseShift) {
        if (reverseShift) {
            precision = -precision;
        }  
        numArray = ("" + number).split("e");
        return +(numArray[0] + "e" + (numArray[1] ? (+numArray[1] + precision) : precision));
    };
    return shift(Math.round(shift(number, precision, false)), precision, true);
}

const weightedMean = (askbid) => {
       const result = askbid.map(function (item) {
        const sum = item[0] * item[1];
        return [sum, item[1]];
    }).reduce(function (p, c) {
        return [p[0] + c[0], p[1] + c[1]];
    }, [0, 0]);
    return result[0] / result[1];
}

module.exports = {
    absoluteAmount,
    buildArbitrageTable,
    calculateArbitrage,
    getArbitrageList,
    roundNumber,
    weightedMean
}