const defaultState = {
    exchanges: [],
    exchange:{},
    markets: []
};
export default (state = defaultState, action) => {
    switch (action.type){
        case 'GET_CCXT_EXCHANGES':
            const exchanges = action.exchanges;
            return {...state, exchanges}
        case 'GET_CCXT_EXCHANGE':
            const exchange = action.exchange;
            return {...state, exchange}
        case 'GET_CCXT_MARKETS':
            const markets = action.markets;
            return {...state, markets}
        case 'CLEAR_CCXT_MARKETS':
            return {...state, markets: []}
        default:
            return state;
    }
};
