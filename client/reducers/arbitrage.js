
const defaultState = {
    arbitrageTable: {
        columns:[],
        rows: []
    },
    weightedArbitrageTable:{
        columns:[],
        rows:[]
    },
    accumulatedArbitrageTable:{
        columns:[],
        rows:[]
    },
    convertedtickers:[],
    convertedorderbook:[],
    accconvertedorderbook:[]
};
export default (state = defaultState, action) => {
    switch (action.type){
        case 'GET_SIMPLE_ARBITRAGE':
            const arbitrageTable = action.arbitrage.arbitrageTable;
            return {...state, arbitrageTable}
        case 'GET_CONVERTED_TICKERS':
            const convertedtickers = action.convertedtickers;
            return {...state, convertedtickers}
        case 'GET_WEIGHTED_ARBITRAGE':
            const weightedArbitrageTable = action.weightedArbitrageTable.arbitrageTable;
            return {...state, weightedArbitrageTable}
        case 'GET_CONVERTED_ORDERBOOK':
            const convertedorderbook = action.convertedorderbook;
            return {...state, convertedorderbook}
        case 'SORT_CONVERTED_TICKERS':
            return {...state, convertedtickers: action.convertedtickers}
        case 'SORT_CONVERTED_ORDERBOOK':
            return {...state, convertedorderbook: action.convertedorderbook}
        case 'GET_ACCUMULATED_ARBITRAGE':
            const accumulatedArbitrageTable = action.accumulatedArbitrageTable.arbitrageTable;
            return {...state, accumulatedArbitrageTable}
        case 'GET_ACCUMULATED_CONVERTED_ORDERBOOK':
            const accconvertedorderbook = action.accconvertedorderbook;
            return {...state, accconvertedorderbook}
        case 'SORT_ACCUMULATED_CONVERTED_ORDERBOOK':
            return {...state, accconvertedorderbook: action.accconvertedorderbook}
        default:
            return state;
    }
};
