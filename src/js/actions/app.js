import React from 'react';
import ajax from 'utils/ajax';
import menuConfig from 'config/menu';
import NProgress from 'nprogress';
import {proBaseUrl,mapCDN} from "config/api"

const Err403 = (cb) => { require.ensure([], require => { cb(require('pages/Error/403')); }); };
let action = {};


/**
 * 切换语言
 */
action.toggleLocale = newLocale => (dispatch) => {
    dispatch({ type: 'APP_TOGGLE_LOCALE', locale: newLocale });
};
/**
 * 获取指定region数据
 */
action.loadRegion = (coun,tag,props) => dispatch => {
    const country = coun?coun:'world';
    if(country){
        ajax.raw('get','/json/'+country+'.json',{},location.host?'http://'+location.host:proBaseUrl).then(json=>{
            dispatch({type:tag,...props,mapJsonData: json})
        })
        // ajax.raw('get','/map/'+country+'.json',{},mapCDN).then(json=>{
        //     dispatch({type:tag,...props,mapJsonData: json});
        // })
    }
}
/**
 * 将当前模块的最新查询条件保存到localstorage中
 */
action.setSearchParamsInLocalStorage = (searchParams,reduceAction) => () => {
    localStorage.setItem('chaos_last_searchParams',JSON.stringify(searchParams));
    localStorage.setItem('chaos_last_search_reduceAction',reduceAction);
}
/**
 * 将上次用户在某个模块的查询条件获取出来
 */
action.getSearchParamsFromLocalStorage = () => dispatch => {
    const searchParams = localStorage.getItem('chaos_last_searchParams');
    const reduceAction = localStorage.getItem('chaos_last_search_reduceAction');
    if(reduceAction){
        dispatch({type:reduceAction,params:JSON.parse(searchParams)});
    }
    return new Promise((resolve)=>{
        resolve(searchParams?JSON.parse(searchParams):undefined)
    });
}

/**
 * 点点菜单链接加载页面
 * @param module
 * git test
 */
action.loadTabPage = (module) => (dispatch, getState) => {
    const state = getState().app;
    const menu = state.menuObj[module];
    const panes = state.panes;
    const index = panes.findIndex(o => o.key === module);
    localStorage.setItem('teye_activeTab',module);

    if (~index) {
        // 已经存在，直接激活
        dispatch({ type: 'APP_TAB_SWITCH', key: module });
    } else {
        // 新添加页面
        NProgress.done().start();
        if (menu) {
            menu.page(component => {
                NProgress.done();
                dispatch({ type: 'APP_TAB_CHANGE',
                    panes: panes.concat([{
                        title: menu.name,
                        key: module,
                        icon: menu.icon,
                        component: React.createElement(component)
                    }]),
                    key: module });
            });
        } else {
            // 403
            Err403(component => {
                NProgress.done();
                dispatch({ type: 'APP_TAB_CHANGE',
                    panes: panes.concat([{
                        title: `403(${module})`,
                        key: module,
                        icon: 'warning',
                        component: React.createElement(component)
                    }]),
                    key: module });
            });
        }
    }

    // module === 'home' && dispatch({ type: 'APP_ENTRY_MENU_SET' });
};

/**
 * 点非菜单链接加载页面
 * */
action.loadLinkPage = module => (dispatch, getState) => {
    const state = getState().app;
    const panes = state.panes;
    const index = panes.findIndex(o => o.key === module);
    if (~index) {
        // 已经存在，直接激活
        dispatch({ type: 'APP_TAB_SWITCH', key: module });
    } else {
        const menu = menuConfig[module];
        menu.page(component => {
            NProgress.done();
            dispatch({ type: 'APP_TAB_CHANGE',
                panes: panes.concat([{
                    title: menu.name,
                    key: module,
                    icon: menu.icon,
                    component: React.createElement(component)
                }]),
                key: module });
        });
    }
};

/**
 * 加载常用入口列表
 * @returns {Function}
 */
action.loadEntryMenu = () => (dispatch, getState) => ajax.get('/home/entry').then(list => {
    const menuObj = getState().app.menuObj;
    dispatch({ type: 'APP_ENTRY_MENU_LOAD',
        data: [
            {
                no: 'entry',
                name: 'menuName_entry',
                list: list.map(module => menuObj[module])
            }
        ] });
});

/**
 * 登录
 * @param loginName
 * @param password
 * @param autoLogin
 * @returns {Function}
 */
action.login = (loginName, password, autoLogin) => dispatch => {
    // return ajax.get('/perf/getAllData',{name:'moriarty'}).then(info => {
    //     console.log(info);
    // })
    return ajax.post('/login', {
        loginName: loginName,
        loginPwd: password,
        auto: autoLogin ? 1 : 0
    }).then(json => {
        // // 请求后发送第二次
        // if (json.status == 0) {
        //     // 成功
        //     return json.data;
        // } else {
        //     // 登录失败
        //     return Promise.reject(json.msg);
        // }
        return json;
    });
};

/**
 * 退出
 * @returns {Function}
 */
action.logout = () => dispatch => ajax.post('/logout').then(() => {
    dispatch({ type: 'APP_LOGOUT' });
});

/**
 * 加载用户信息
 */
action.loadUserInfo = () => dispatch => ajax.get('/profile').then(data => {
    dispatch({ type: 'APP_SET_USER_INFO', info: data });
    return data;
});

/**
 * 加载用户菜单信息
 * @returns {Function}
 */
action.loadUserMenu = (reloadOnly) => dispatch => ajax.get('/menu/user').then(data => {
    console.log(data,"data");
    // url -> obj
    let obj = {
        // 固定菜单页面
        home: menuConfig.home,
        profile: menuConfig.profile,
        avatar: menuConfig.avatar,
        password: menuConfig.password
    };
    /**
     * 递归设置每个菜单的级别码
     * @param item
     * @param no 如三级目录级别码：011
     */
    function recursive (item, no) {
        if (item.list) {
            item.list.forEach((o, i) => {
                const num = no + '>' + i.toString();
                o.no = num;
                const menu = menuConfig[o.module];
                if (menu) {
                    o.page = menu.page;
                    o.icon = menu.icon;
                    if (!o.functions) {
                        o.functions = [];
                    }
                    obj[o.module] = o;
                }
                recursive(o, num);
            });
        }
    }
    data.forEach((item, i) => {
        const no = '>' + i.toString();
        item.no = no;
        const menu = menuConfig[item.module];
        if (menu) {
            item.page = menu.page;
            item.icon = menu.icon;
            if (!item.functions) {
                item.functions = [];
            }
            obj[item.module] = item;
        }
        recursive(item, no);
    });

    dispatch({
        type: 'APP_SET_MENU',
        data,
        obj
    });
    let module = '';
    if(localStorage.getItem('teye_activeTab')&&localStorage.getItem('teye_activeTab')!='null')
        module = localStorage.getItem('teye_activeTab');
    else
        module = 'home';
    // const module = localStorage.getItem('activeTab')||'home';
    if (!reloadOnly) {
        // 默认打开首页
        // dispatch(action.loadTabPage('home'));
        dispatch(action.loadTabPage(module));
    }

    return data;
});

/**
 * 获取当前日期信息
 */
action.loadDataInfo = () => dispatch => ajax.get('/common/current-date').then(info => {
    dispatch({ type: 'APP_DATE_INFO', info });
});

export default action;
