import axios from 'axios';

export const getArbitrageTable = (crypt)=> {
    return (dispatch) => {
        axios.get(`/api/v0/arbitrage/simple/${crypt}`).then((res)=>{
            const arbitrage = res.data;
            dispatch({type: 'GET_SIMPLE_ARBITRAGE', arbitrage});            
        })
    }
}