import axios from 'axios';

export const addExchange = (exchange) =>{
    return (dispatch) =>{
        axios.post('/api/v0/exchange', exchange).then((res)=>{
            dispatch({
                type: 'ADD_EXCHANGE',
                exchange: res.data
            }), e => console.log(e)
        });
    }
}
export const getExchanges = ()=> {
    return (dispatch) => {
        axios.get('/api/v0/exchange').then((res)=>{
            const exchanges = {data: res.data};
            dispatch({type: 'GET_EXCHANGES', exchanges});            
        })
    }
}

export const getExchangeById = (id)=> {
    return (dispatch) => {
        axios.get(`/api/v0/exchange/${id}`).then((res)=>{
            const exchange = {data: res.data};
            dispatch({type: 'GET_EXCHANGES', exchanges});            
        })
    }
}

export const deleteExchange = (id) => {
    return (dispatch)=>{
        if (id){
            axios.delete(`/api/v0/exchange/${id}`).then((res)=>{
                dispatch({
                    type: 'DELETE_EXCHANGE',
                    exchange: {
                        _id: id
                    }
                });
            }, (e)=>{
                console.log(e);
            });
        }
    }
}

export const setSelectedItems = (selectedItems = [])=>{
    return (dispatch)=>{
        dispatch({
            type:'SET_SELECTEDITEMS',
            selectedItems
        });
    }
};
//SORT_EXCHANGES
export const sortExchanges = (data) =>{
    return (dispatch) => {
        dispatch({type:'SORT_EXCHANGES', data});
    }
}

export const updateExchange = (id, exchange) =>{
    return (dispatch) =>{
        axios.patch(`/api/v0/exchange/${id}`, exchange).then((res)=>{
            dispatch({
                type: 'UPDATE_EXCHANGE',
                id,
                exchange: res.data
            }, (e)=>{console.log(e);})
        })
    }
}