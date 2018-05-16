import axios from 'axios';

export const getArbitrageTable = (crypt)=> {
    return (dispatch) => {
        axios.get(`/api/v0/arbitrage/simple/${crypt}`).then((res)=>{
            const arbitrage = res.data;
            dispatch({type: 'GET_SIMPLE_ARBITRAGE', arbitrage});            
        })
    }
}
export const getConvertedTickers = (crypt)=> {
    return (dispatch) => {
        axios.get(`/api/v0/arbitrage/convertedtickers/${crypt}`).then((res)=>{
            const convertedtickers = res.data.data;
            dispatch({type: 'GET_CONVERTED_TICKERS', convertedtickers});            
        })
    }
}
export const getWeightedArbitrageTable = (crypt, vol, callback)=> {
    return (dispatch) => {
        axios.get(`/api/v0/arbitrage/weighted/${crypt}/${vol}`).then((res)=>{
            const arbitrage = res.data;
            dispatch({type: 'GET_WEIGHTED_ARBITRAGE',weightedArbitrageTable:arbitrage});
            if (callback){
                callback();
            }
        })
    }
}

export const getConvertedOrderbook = (crypt, vol, callback)=> {
    return (dispatch) => {
        axios.get(`/api/v0/arbitrage/convertedorderbook/${crypt}/${vol}`).then((res)=>{
            const convertedorderbook = res.data.data;
            dispatch({type: 'GET_CONVERTED_ORDERBOOK', convertedorderbook});
            if (callback){
                callback();
            }
        })
    }
}
export const sortConvertedTickers = (data) =>{
    return (dispatch) => {
        dispatch({type:'SORT_CONVERTED_TICKERS', convertedtickers:data});
    }
}
export const sortConvertedOrderbook = (data) =>{
    return (dispatch) => {
        dispatch({type:'SORT_CONVERTED_ORDERBOOK', convertedorderbook:data});
    }
}