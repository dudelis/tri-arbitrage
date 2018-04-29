
const defaultState = {
    data: [],
    searchFilter: ''
};
export default (state = defaultState, action) => {
    switch (action.type){
        case 'GET_LOGS':
            const data = action.logs.data;
            return {...state, data};
        case 'SORT_LOGS':
            return {...state, data: action.data}
        case 'SEARCH_LOGS':
            return {...state, searchFilter: action.searchFilter}
        default:
            return state;
    }
};
