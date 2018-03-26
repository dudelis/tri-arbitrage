import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import exchangeReducer from '../reducers/exchanges';
import fiatReducer from '../reducers/fiats';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default () =>{
    const store = createStore(
        combineReducers({
            exchanges: exchangeReducer,
            fiats: fiatReducer
        }),
        composeEnhancers(applyMiddleware(thunk))
    );

    return store;
};