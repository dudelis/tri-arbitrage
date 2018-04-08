import axios from 'axios';

//GET_TICKERS
export const getTickers = (limit) =>{
    return (dispatch) => {
        axios
            .get(`/api/v0/ticker?limit=${limit}`)
            .then((res)=>{
                const tickers = {data:res.data};
                dispatch({type:'GET_TICKERS', tickers});
        });
    }
}
//SET_TICKERS_SORT
export const setTickersSort = (data) =>{
    return (dispatch) => {
        dispatch({type:'SET_TICKERS_SORT', data});
    }
}
//SEARCH_TICKER
export const searchTicker = (search, exchangeId) =>{
    return (dispatch)=>{
        dispatch({type:'SEARCH_TICKER', filters:{search, exchangeId}})
    }
}