const defaultState = {
    settings: {},
    interval:'',
    message: ''
    
};
export default (state = defaultState, action) => {
    switch (action.type){
        case 'AGGREGATOR_GET_CRYPTO_SETTINGS':
            const settings = action.settings;
            return {...state, settings}
        case 'AGGREGATOR_SET_CRYPTO_INTERVAL':
            const interval = action.interval;
            return {...state, interval}
        case 'AGGREGATOR_SYNC_EXCHANGE':
            const message = action.message;
            return {...state, message}
        case 'AGGREGATOR_CLEAR_MESSAGE':
            return {...state, message:''}
        default:
            return state;
    }
};