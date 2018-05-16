
const buildArbitrageTable = (convertedData)=>{
    convertedData.sort(function(a,b){
        if(a.exchangeName.toLowerCase() < b.exchangeName.toLowerCase()) return -1;
        if(a.exchangeName.toLowerCase() > b.exchangeName.toLowerCase()) return 1;
        return 0;
    });
    //creating columns - Columns - Bids, Rows - Asks
    const columns = [{key: 'name', name: 'Bids   \\   Asks'}];
    convertedData.forEach(item=>{
        if (item.ask > 0){
            columns.push({key: item.exchangeId, name: item.exchangeName});
        }
    });
    const rows = [];
    convertedData.forEach(row => {
        if (row.bid > 0){
            const rowObj = {};
            rowObj['name'] = row.exchangeName;
            const bid = row.bid;
            convertedData.forEach(col=>{
                if (row.exchangeId === col.exchangeId){
                    rowObj[col.exchangeId] = '-';    
                } else{
                    if (col.ask>0){         
                        const arbitrage = calculateArbitrage(bid, col.ask);
                        rowObj[col.exchangeId] = roundNumber(arbitrage, 2);
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

const calculateArbitrage = (bid, ask) =>{
    return (ask / bid - 1) * 100;
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
    buildArbitrageTable,
    calculateArbitrage,
    roundNumber,
    weightedMean
}