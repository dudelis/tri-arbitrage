
const exchangesReducerDefaultState = {
    data: [],
    selectedItems: []
};
export default (state = exchangesReducerDefaultState, action) => {
    switch (action.type){
        case 'GET_EXCHANGES':
            const data = action.exchanges.data;
            return {...state, data, selectedItems:[]};
        case 'SET_SELECTEDITEMS':
            const selectedItems = action.selectedItems;
            return {...state, selectedItems};
        case 'DELETE_EXCHANGE':
            const dataDel = state.data.filter(({_id})=> _id !== action.exchange._id);
            return {...state, data: dataDel};
        default:
            return state;
    }
};
