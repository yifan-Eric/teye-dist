import ajax from 'utils/ajax';
import {isEmpty} from "utils";

let actions = {};
actions.loadFirstTable = () => (dispatch,getState) => {
    // const c_state = state.conversions;
    const c_searchParams = getState().conversions.searchParams;
    const d_state = getState().dashboard;
    const d_searchParams = d_state.searchParams;
    const packageName = d_state.productList.find(o=>{
        return o.id==d_searchParams.appName;
    }).packageName;
    return ajax.get('/report/hotevent/version/sub',{
        packageName:packageName,
        appVersions:d_searchParams.appVersion,
        eventIds:c_searchParams.eventIds,
        allSubEvents:c_searchParams.allSubEvents,
        allEvents:c_searchParams.allEvents,
        subTopK:c_searchParams.subTopK,
        topK:c_searchParams.topK
    }).then(data => {
        console.log(data);
        let list = [];
        if(!isEmpty(data)&&!isEmpty(data.eventSubSum)){
            Object.keys(data.eventSubSum).forEach(key=>{
                const eventSum = data.eventSum[key];
                Object.keys(data.eventSubSum[key]).forEach(subKey=>{
                    const count = data.eventSubSum[key][subKey];
                    list.push({'con-name':subKey,count:count,'count-per':(count/eventSum).toFixed(4)});
                })
            })
        }
        dispatch({type:'CONVERSIONS_FIRSTTABLE_LOAD',data:list});
        // dispatch({type:'CONVERSIONS_FIRSTTABLE_LOAD',data:mockData});
    })
    // const mockData = [
    //     {'con-name':'app_update',count:3246,'count-per':'20%',value:0,'value-per':0,'con-flag':true}
    // ];
}

actions.loadHotEvents = () => (dispatch,getState) => {
    const state = getState().dashboard;
    const searchParams = state.searchParams;
    const version = searchParams.appVersion;
    const packageName = state.productList.find(o=>{
        return o.id==searchParams.appName;
    }).packageName;
    return ajax.get('/report/hotevent',{'packageNames':packageName,'appVersions':version}).then(data=>{
        let list = Object.keys(data.eventSum).map(o=>({id:o,name:o}))
        dispatch({type:'CONVERSIONS_EVENTS_LOAD',events:list});
    })
}

actions.loadSecondTable = () => dispatch => {
    const mockData = [
        {'col1':'',col2:'','col3':'',col4:'','col5':''}
    ];
    dispatch({type:'CONVERSIONS_SECONDTABLE_LOAD',data:mockData});
}

export default actions;