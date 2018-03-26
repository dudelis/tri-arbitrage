import axios from 'axios';

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