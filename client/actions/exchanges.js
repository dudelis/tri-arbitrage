import axios from 'axios';


export const getExchanges = ()=> {
    return (dispatch) => {
        axios.get('/api/v0/exchange').then((res)=>{
            const exchanges = {data: res.data};
            dispatch({type: 'GET_EXCHANGES', exchanges});            
        })
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