import axios from 'axios';

export const getExchanges = ()=> {
    return (dispatch) => {
        axios.get(`/api/v0/ccxt/exchanges`).then((res)=>{
            const exchanges = res.data.exchanges;
            dispatch({type: 'GET_CCXT_EXCHANGES', exchanges});            
        })
    }
}

export const getExchange = (exchangeid)=> {
    return (dispatch) => {
        axios.get(`/api/v0/ccxt/exchange/${exchangeid}`).then((res)=>{
            const exchange = res.data.exchange;
            dispatch({type: 'GET_CCXT_EXCHANGE', exchange});            
        })
    }
}
export const getMarkets = (exchangeid) =>{
    return (dispatch) => {
        axios.get(`/api/v0/ccxt/exchange/${exchangeid}/markets`).then((res)=>{
            const markets = res.data.markets;
            dispatch({type: 'GET_CCXT_MARKETS', markets});            
        })
    }
}
export const clearMarkets = () =>{
    return (dispatch) => {
        dispatch({type: 'CLEAR_CCXT_MARKETS'});
    }
}