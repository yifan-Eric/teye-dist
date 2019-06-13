import ajax from 'utils/ajax';
import {message} from 'antd';
let actions = {};

/**
 * 查询app列表
 * @returns {function(*): *}
 */
actions.loadApps = () => dispatch => {
    return ajax.get('/report/app/list',{}).then(list=>{
        dispatch({type:'APPMGR_PRODUCTLIST_LOAD',list:list.map(o=>({id:o.appId,name:o.appName,packageName:o.packageName}))});
    })
}
/**
 * 新增app
 * @param appName
 * @param pkgName
 * @returns {Function}
 */
actions.addApp = (appName,pkgName) => dispatch => {
    return ajax.post('/report/app/add',JSON.stringify({appName:appName,appPackageName:pkgName})).then(()=>{
        message.success('添加成功');
        dispatch(actions.loadApps());
    })
}
/**
 * 删除app
 * @param id
 * @returns {function(*): *}
 */
actions.deleteApp = (id) => dispatch => {
    return ajax.get('/report/app/'+id+'/delete',{}).then(()=>{
        message.success('删除成功');
        dispatch(actions.loadApps());
    })
}
/**
 * 更新app
 * @param id
 * @param appName
 * @param pkgName
 * @returns {function(*): *}
 */
actions.updateApp = (id,appName,pkgName) => dispatch => {
    return ajax.post('/report/app/update',{appId:id,appName:appName,appPackage:pkgName}).then(data=>{
        message.success('更新成功');
        dispatch(actions.loadApps());
    })
}

/**
 * 查询app版本列表
 * @param appId
 * @returns {function(*): *}
 */
actions.loadAppVersions = (appId) => (dispatch,getState) => {
    if(!appId)
        dispatch({type:'APPMGR_VERSIONLIST_LOAD', list:[]});
    else
        return ajax.get('/report/app/version/list',{appId}).then(data=>{
            dispatch({
                type:'APPMGR_VERSIONLIST_LOAD',
                list:data.appVersionList?data.appVersionList.map(o=>({id:o.version,name:o.version,versionId:o.id})):[]
            })
        })
}
/**
 * 新增version
 * @param appId
 * @param appVersion
 * @returns {function(*): *}
 */
actions.addVersion = (appId,appVersion) => (dispatch) => {
    console.log(appId,appVersion);
    return ajax.post('/report/app/version/add',JSON.stringify({appId,appVersion})).then(()=>{
        message.success('添加成功');
        dispatch(actions.loadAppVersions(appId));
    })
}
/**
 * 更新version
 * @param appVersionId
 * @param appVersion
 * @returns {function(*): *}
 */
actions.updateVersion = (appId,appVersionId,appVersion) => (dispatch) => {
    return ajax.post('/report/app/version/update',JSON.stringify({appVersionId,appVersion})).then(()=>{
        message.success('更新成功');
        dispatch(actions.loadAppVersions(appId));
    })
}

actions.deleteVersion = (appId,versionId) => dispatch => {
    return ajax.get('/report/app/version/'+versionId+'/delete',{}).then(()=>{
        message.success('删除成功');
        dispatch(actions.loadAppVersions(appId));
    })
}

export default actions;