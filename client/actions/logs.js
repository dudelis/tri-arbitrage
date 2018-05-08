import axios from 'axios';

//GET_LOGS
export const getLogs = (limit) =>{
    return (dispatch) => {
        axios
            .get(`/api/v0/log?limit=${limit}`)
            .then((res)=>{
                const logs = {data:res.data};
                dispatch({type:'GET_LOGS', logs});
        });
    }
}
//SORT_LOGS
export const sortLogs = (data) =>{
    return (dispatch) => {
        dispatch({type:'SORT_LOGS', data});
    }
}
//SEARCH_LOGS
export const searchLogs = (searchFilter) =>{
    return (dispatch)=>{
        dispatch({type:'SEARCH_LOGS', searchFilter})
    }
}
export const setSelectedItems = (selectedItems = [])=>{
    return (dispatch)=>{
        dispatch({
            type:'LOG_SET_SELECTED_ITEMS',
            selectedItems
        });
    }
};