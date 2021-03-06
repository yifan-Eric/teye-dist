import { objectAppend } from '../utils';

const defaultState = {
    loading: false,
    page: {
        pageNo: 1,
        pageSize: 1,
        dataCount: 0
    },
    searchParams: {},
    list: []
};

export default (state, action) => {
    let newState = {};
    switch (action.type) {
    case 'CARE_ELECTRON_CARD_LOADING':
        newState.loading = action.loading;
        break;
    case 'CARE_ELECTRON_CARD_SEARCHPARAM':
        newState.searchParams = action.params;
        break;
    case 'CARE_ELECTRON_CARD_SEARCHPARAM_CHANGE':
        newState.searchParams = action.params;
        break;
    case 'CARE_ELECTRON_CARD_LOAD':
        newState.page = {
            pageNo: action.pageNo,
            pageSize: action.pageSize,
            dataCount: action.dataCount
        };
        newState.list = action.list;
        break;
    default:return state || defaultState;
    }
    return objectAppend(newState, state);
};
