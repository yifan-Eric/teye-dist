import {objectAppend} from "../utils"

const defaultState = {
    loading:false,
    searchParams:{
        eventIds:[],
        allSubEvents:false,
        subTopK:3,
        topK:3,
        allEvents:false
    },
    events:[],
    firstTableData : [],
    secondTableData : []
}

export default (state,action) => {
    let newState = {};
    switch(action.type){
        case 'CONVERSIONS_LOADING':
            newState.loading = action.loading;
            break;
        case 'CONVERSIONS_SEARCHPARAMS_CHANGE':
            newState.searchParams = action.params;
            break;
        case 'CONVERSIONS_EVENTS_LOAD':
            newState.events = action.events;
            break;
        case 'CONVERSIONS_FIRSTTABLE_LOAD':
            newState.firstTableData = action.data;
            break;
        case 'CONVERSIONS_SECONDTABLE_LOAD':
            newState.secondTableData = action.data;
            break;
        default:return state||defaultState;
    }
    return objectAppend(newState,state);
}