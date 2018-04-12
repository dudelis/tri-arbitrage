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
            const convertedtickers = res.data.convertedtickers;
            dispatch({type: 'GET_CONVERTED_TICKERS', convertedtickers});            
        })
    }
}
export const sortConvertedTickers = (data) =>{
    return (dispatch) => {
        dispatch({type:'SORT_CONVERTED_TICKERS', convertedtickers:data});
    }
}