import {objectAppend} from "../utils";

const defaultState = {
    productList:[],
    appVersionList:[],
    appEditModalShow:false,
    appEditData:{
        id:null,
        appName:'',
        packageName:''
    },
    versionEditModalShow:false,
    versionEditData:{
        appId:null,
        versionId:null,
        versionName:''
    }
}

export default (state,action) => {
    let newState = {};
    switch(action.type){
        case 'APPMGR_PRODUCTLIST_LOAD':
            newState.productList = action.list;
            break;
        case 'APPMGR_VERSIONLIST_LOAD':
            newState.appVersionList = action.list;
            break;
        case 'APPMGR_APPEDITMODAL_SHOW':
            newState.appEditModalShow = action.show;
            break;
        case 'APPMGR_APPEDITDATA_RESET':
            newState.appEditData = defaultState.appEditData;
            break;
        case 'APPMGR_APPEDITDATA_CHANGE':
            newState.appEditData = action.data;
            break;
        case 'APPMGR_VERSIONEDITMODAL_SHOW':
            newState.versionEditModalShow = action.show;
            break;
        case 'APPMGR_VERSIONEDITDATA_RESET':
            newState.versionEditData = defaultState.appEditData;
            break;
        case 'APPMGR_VERSIONEDITDATA_CHANGE':
            newState.versionEditData = action.data;
            break;
        default: return state || defaultState;
    }
    return objectAppend(newState, state);
}