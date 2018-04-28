
const exchangesReducerDefaultState = {
    data: [],
    selectedItems: [],
    
};
export default (state = exchangesReducerDefaultState, action) => {
    switch (action.type){
        case 'ADD_EXCHANGE':
            return {
                ...state,
                data: [
                    ...state.data,
                    action.exchange
                ]
            }
        case 'DELETE_EXCHANGE':
            const dataDel = state.data.filter(({_id})=> _id !== action.exchange._id);
            return {...state, data: dataDel};
        case 'GET_EXCHANGES':
            const data = action.exchanges.data;
            return {...state, data, selectedItems:[]};
        case 'SET_SELECTEDITEMS':
            const selectedItems = action.selectedItems;
            return {...state, selectedItems};
        case 'SORT_EXCHANGES':
            return {...state, data: action.data}
        case 'UPDATE_EXCHANGE':
            const updateExchangeData = state.data.map((exchange)=>{
                if(exchange._id === action.id){
                    return {
                        ...exchange,
                        ...action.exchange
                    }
                } else {
                    return exchange;
                }
            });
            return {...state, data:updateExchangeData }
        default:
            return state;
    }
};
