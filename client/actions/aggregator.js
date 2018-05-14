import axios from 'axios';


//crypto
export const getSettings = ()=> {
    return (dispatch) => {
        axios.get(`/api/v0/aggregator/crypto/settings`).then((res)=>{
            const settings = res.data.settings;
            dispatch({type: 'AGGREGATOR_GET_CRYPTO_SETTINGS', settings});            
        })
    }
}

export const setCryptoInterval = (interval)=> {
    return (dispatch) => {
        axios.post(`/api/v0/aggregator/crypto/setinterval/${interval}`).then((res)=>{
            const changedInterval = res.data.interval;
            dispatch({type: 'AGGREGATOR_SET_CRYPTO_INTERVAL', interval: changedInterval});            
        })
    }
}

export const syncExchange = (id) =>{
    return (dispatch) => {
        
        axios.get(`/api/v0/aggregator/crypto/exchange/${id}`).then((res)=>{
            const message = res.data.message;
            dispatch({type: 'AGGREGATOR_SYNC_EXCHANGE', message});            
        })        
    }
}
export const clearMessage = () =>{
    return (dispatch) => {
        dispatch({type: 'AGGREGATOR_CLEAR_MESSAGE'});
    }
}