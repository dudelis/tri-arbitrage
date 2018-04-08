
const fiatsReducerDefaultState = {
    data: [],
    searchFilter: ''
};
export default (state = fiatsReducerDefaultState, action) => {
    switch (action.type){
        case 'GET_FIATS':
            const data = action.fiats.data;
            return {...state, data};
        case 'SET_FIATS_SORT':
            return {...state, data: action.data}
        case 'SET_SEARCH_FILTER':
            return {...state, searchFilter: action.searchFilter}
        default:
            return state;
    }
};
