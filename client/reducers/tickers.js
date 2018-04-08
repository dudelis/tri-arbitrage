
const tickersReducerDefaultState = {
    data: [],
    filters: {
        search: '',
        exchangeId: ''
    }
};
export default (state = tickersReducerDefaultState, action) => {
    switch (action.type){
        case 'GET_TICKERS':
            const data = action.tickers.data;
            return {...state, data};
        case 'SET_TICKERS_SORT':
            return {...state, data: action.data}
        case 'SEARCH_TICKER':
            return {...state, filters: action.filters}
        default:
            return state;
    }
};
