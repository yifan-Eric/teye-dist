import { objectAppend } from '../utils';

const defaultState = {
    subPageShow:false,
    regionMapCard:{
        option:{},
        data:{},
        mapJsonData:{}
    },
    secondCard:{
        option:{},
        data:{}
    }
}

export default (state,action) => {
    let newState = {};
    switch(action.type){
        case 'DASHBOARD2_SUBPAGE_SHOW':
            newState.subPageShow = action.subPageShow;
            break;
        case 'DASHBOARD2_REGIONMAPCARD_LOAD':
            newState.regionMapCard = {
                option:action.option,
                data:action.data,
                mapJsonData: action.mapJsonData
            }
            break;
        case 'DASHBOARD2_SECONDCARD_LOAD':
            newState.secondCard = {
                option:action.option,
                data:action.data
            }
            break;
        default:return state||defaultState;
    }
    return objectAppend(newState,state);
}