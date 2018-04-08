
const arbitrageReducerDefaultState = {
    arbitrageTable: {
        columns:[],
        rows: []
    }
};
export default (state = arbitrageReducerDefaultState, action) => {
    switch (action.type){
        case 'GET_SIMPLE_ARBITRAGE':
            const arbitrageTable = action.arbitrage.arbitrageTable;
            return {...state, arbitrageTable}
        default:
            return state;
    }
};
