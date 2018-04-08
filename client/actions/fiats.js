import axios from 'axios';


//GET_FIATS
export const getFiats = (limit) =>{
    return (dispatch) => {
        axios
            .get(`/api/v0/fiat?limit=${limit}`)
            .then((res)=>{
                const fiats = {data:res.data};
                dispatch({type:'GET_FIATS', fiats});
        });
    }
}
//SET_FIATS_SORT
export const setFiatsSort = (data) =>{
    return (dispatch) => {
        dispatch({type:'SET_FIATS_SORT', data});
    }
}
//SET_SEARCH_FILTER
export const setSearchFilter = (searchFilter) =>{
    return (dispatch)=>{
        dispatch({type:'SET_SEARCH_FILTER', searchFilter})
    }
}