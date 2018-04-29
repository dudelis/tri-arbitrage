import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import exchangeReducer from '../reducers/exchanges';
import fiatReducer from '../reducers/fiats';
import arbitrageReducer from './../reducers/arbitrage';
import tickerReducer from './../reducers/tickers';
import logReducer from './../reducers/logs';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default () =>{
    const store = createStore(
        combineReducers({
            exchanges: exchangeReducer,
            fiats: fiatReducer,
            arbitrage: arbitrageReducer,
            tickers: tickerReducer,
            logs: logReducer
        }),
        composeEnhancers(applyMiddleware(thunk))
    );

    return store;
};