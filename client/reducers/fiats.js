
const fiatsReducerDefaultState = {
    data: []
};
export default (state = fiatsReducerDefaultState, action) => {
    switch (action.type){
        case 'GET_FIATS':
            const data = action.fiats.data;
            return {...state, data};
        default:
            return state;
    }
};
