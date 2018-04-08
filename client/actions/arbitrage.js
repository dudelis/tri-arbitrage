import axios from 'axios';

export const getArbitrageTable = ()=> {
    return (dispatch) => {
        axios.get('/api/v0/arbitrage/simple').then((res)=>{
            const arbitrage = res.data;
            dispatch({type: 'GET_SIMPLE_ARBITRAGE', arbitrage});            
        })
    }
}