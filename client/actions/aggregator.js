import axios from 'axios';


//crypto
export const getSettings = ()=> {
    return (dispatch) => {
        axios.get(`/api/v0/aggregator/crypto/settings`).then((res)=>{
            const settings = res.data.settings;
            dispatch({type: 'GET_CRYPTO_SETTINGS', settings});            
        })
    }
}

export const setCryptoInterval = (interval)=> {
    return (dispatch) => {
        axios.post(`/api/v0/aggregator/crypto/setinterval/${interval}`).then((res)=>{
            const changedInterval = res.data.interval;
            dispatch({type: 'SET_CRYPTO_INTERVAL', interval: changedInterval});            
        })
    }
}
export const sortConvertedTickers = (data) =>{
    return (dispatch) => {
        dispatch({type:'SORT_CONVERTED_TICKERS', convertedtickers:data});
    }
}