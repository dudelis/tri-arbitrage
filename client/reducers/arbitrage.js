
const arbitrageReducerDefaultState = {
    arbitrageTable: {
        columns:[],
        rows: []
    },
    convertedtickers:[]
};
export default (state = arbitrageReducerDefaultState, action) => {
    switch (action.type){
        case 'GET_SIMPLE_ARBITRAGE':
            const arbitrageTable = action.arbitrage.arbitrageTable;
            return {...state, arbitrageTable}
        case 'GET_CONVERTED_TICKERS':
            const convertedtickers = action.convertedtickers;
            return {...state, convertedtickers}
        case 'SORT_CONVERTED_TICKERS':
            return {...state, convertedtickers: action.convertedtickers}
        default:
            return state;
    }
};
