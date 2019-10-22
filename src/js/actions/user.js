import ajax from 'utils/ajax';
let action = {};

/**
 * 加载组织数据
 * @returns {Function}
 */
action.loadOrgData = () => (dispatch, getState) => {
    return new Promise((resolve,reject)=>{
        let data = JSON.parse(JSON.stringify(getState().user.orgTree));
        if(data){
            resolve(data)
        }else{
            resolve(ajax.get("/org/tree"))
        }
    })
        .then(data=>{
            let __data = JSON.parse(JSON.stringify(data))
            dispatch({ type: 'SAVE_USERTREE', orgTree: __data });
            let listData = []; // 列状
            let treeData = data;
            // 递归计算附加属性
            const recursive = function (item) {
                listData.push(item);
                if (item.list && item.list.length) {
                    item.list.forEach(function (o, i, list) {
                        o.parentId = item.id;
                        o.level = item.level + 1;
                        o.last = i === list.length - 1; // 是否为当前级别的最后一个
                        o.indents = item.indents.slice(0, -1); // 包含父级菜单的前(n-1)个
                        if (o.level > 1) {
                            // 父菜单的第n个不一定跟子菜单同列的那个相同，这里结合图形看更直观
                            o.indents.push(item.last ? '' : '│');
                        }
                        o.indents.push(o.last ? '└' : '├'); // 该级菜单的最后一个
                        recursive(o);
                    });
                }
            };
            treeData.forEach(function (o, i, list) {
                o.indents = []; // 体现关系的缩进符
                o.level = 0; // 深度级别，从0级开始
                o.last = i === list.length - 1; // 是否为当前级别的最后一个
                recursive(o);
            });
            dispatch({ type: 'USER_ORG_DATA', data: treeData, listData: listData });
    
            return treeData;
        })
};

function handleUser (item, type, data) {
    try{
    if (item.id == data.parentId) {
        if (type === 'add') {
            if(!item.list) item.list = [];
            item.list.push(data);
        } else if (type === 'update') {
            let index = item.list.findIndex(i => i.id === data.id);
            let temp = item.list[index];
            temp = Object.assign({}, temp, data);
            item.list.splice(index, 1, temp);
        } else if (type === 'delete') {
            let index = item.list.findIndex(i => i.id === data.id);
            item.list.splice(index, 1);
        }
    } else if (item.list) {
        item.list.forEach(i => handleUser(i, type, data));
    }
}catch(e){
    console.log("error",e);
}
}

/**
 * 添加组织
 * @param data
 * @returns {Function}
 */
function addOrg (data) {
    return (dispatch, getState) => {
        let orgTree = JSON.parse(JSON.stringify(getState().user.orgTree)); 
        data.id = (Math.random() * 100000).toFixed(0) / 1 + 1000000;
        if (data.parentId === 0) {
            orgTree.push(data);
        } else {
            orgTree.forEach(i => {
                handleUser(i, 'add', data);
            });
        }
        orgTree = JSON.parse(JSON.stringify(orgTree));
        dispatch({ type: 'SAVE_USERTREE', orgTree });
        return Promise.resolve()
    };
}
action.addOrg = addOrg;

/**
 * 更新组织
 * @param data
 * @returns {Function}
 */
function updateOrg (data) {
    return (dispatch,getState) => {
        let orgTree = JSON.parse(JSON.stringify(getState().user.orgTree)); 
        if (data.parentId == 0) {
            let index = orgTree.findIndex(i => i.id == data.id);
            let temp = orgTree[index];
            temp = Object.assign({}, temp, data);
            orgTree.splice(index, 1, temp);
        } else {
            orgTree.forEach(i => {
                handleUser(i, 'update', data);
            });
        }
        orgTree = JSON.parse(JSON.stringify(orgTree));
        dispatch({ type: 'SAVE_USERTREE', orgTree });
        return Promise.resolve()
    };
}
action.updateOrg = updateOrg;

/**
 * 删除组织
 * @param item
 * @returns {Function}
 */
function deleteOrg (data) {
    return (dispatch,getState) => {
        let orgTree = JSON.parse(JSON.stringify(getState().user.orgTree)); 
        if (data.parentId == 0) {
            let index = orgTree.findIndex(i => i.id == data.id);
            orgTree.splice(index, 1);
        } else {
            orgTree.forEach(i => {
                handleUser(i, 'delete', data);
            });
        }
        orgTree = JSON.parse(JSON.stringify(orgTree));
        dispatch({ type: 'SAVE_USERTREE', orgTree });
        return Promise.resolve();
    };
    
}
action.deleteOrg = deleteOrg;

/**
 * 选择一个组织
 * @param id
 * @returns {Function}
 */
function selectOrg (id) {
    return dispatch => {
        dispatch({ type: 'USER_ORG_SELECT', id: id });
        return dispatch(loadUserPage(id, 1));
    };
}
action.selectOrg = selectOrg;

/**
 * 加载用户分页列表
 * @param orgId
 * @param pageNo
 * @returns {Function}
 */
function loadUserPage (orgId, pageNo = 1) {
    return (dispatch, getState) => {
        const state = getState().user;
        let userPageObj = state.userPageObj;
        let id = state.orgSelectedId;
        let name = state.orgList.find(i=>i.id === id).name
        new Promise((resolve,reject)=>{
            dispatch({ type: 'USER_LOADING', loading: true });
            if(userPageObj[id]){
                resolve(userPageObj[id])
            }else{
                resolve(ajax.get("/user"))
            }
        })
            .then(data=>{
                let _obj = JSON.parse(JSON.stringify(userPageObj));
                _obj[id] = data;
                _obj = JSON.parse(JSON.stringify(_obj));
                dispatch({type:"SAVE_USERPAGEOBJ",obj:_obj})
                dispatch({
                    type: 'USER_PAGE_LOAD',
                    no: pageNo,
                    count: data.totalPages,
                    dataCount: data.totalCount,
                    list: data.result.map(user => {
                        user.role = user.roles.map(role => role.roleCode);
                        // if(user.isPic==1){
                        //     user.role.push('微信管理员');
                        // }
                        user.org = name
                        user.role = user.role.join(',');
                        // if(!user.org){
                        //     user.org='公司';
                        // }
                        return user;
                    })
                });
                dispatch({ type: 'USER_LOADING' });
            })
    };
}
action.loadUserPage = loadUserPage;

/**
 * 加载指定用户信息
 * @param id
 * @returns {Function}
 */
function loadUserInfo (id) {
    return dispatch => {
        return ajax
            .get('/user/info', {
                id: id
            })
            .then(data => {
                // 组织
                if (!data.org) {
                    data.org = '公司';
                }

                // 角色
                let roleNames = [];
                data.roleIds = data.roles.map(o => {
                    roleNames.push(o.roleCode);
                    return o.id;
                });
                data.role = roleNames.join(',');
                delete data.roles;
                dispatch({ type: 'USER_INFO_LOAD', data: data });
            });
    };
}
action.loadUserInfo = loadUserInfo;

/**
 * 添加用户
 * @param data
 * @returns {Function}
 */
function addUser (data) {
    return (dispatch,getState) => {
        try{
        const state = getState().user;
        let userPageObj = state.userPageObj;
        let objId = data.orgId;
        let obj = userPageObj[objId];
        data.id = (Math.random() * 100000).toFixed(0) / 1 + 1000000;
        if(!obj) return Promise.resolve();
        let name = state.orgList.find(i=>i.id === objId).name
        let tempObj = Object.assign( {
            roles: [{ roleCode: 'IT' }],
            name:"",
            org:name,
            sex:"女"
        },data)
        obj.result.push(tempObj);
        let _obj = JSON.parse(JSON.stringify(userPageObj));
        _obj[id] = obj;
        _obj = JSON.parse(JSON.stringify(_obj));
        dispatch({type:"SAVE_USERPAGEOBJ",obj:_obj})
        console.log(obj,"oooooo")
    }catch(e){
        console.log("e",e)
    }
        return Promise.resolve()
    };
}
action.addUser = addUser;

/**
 * 更新用户
 * @param data
 * @returns {Function}
 */
function updateUser (data) {
    return dispatch => {
        return ajax.post('/user/update', data);
    };
}
action.updateUser = updateUser;

/**
 * 设为离职
 * @param id
 * @returns {Function}
 */
function dismissUser (id) {
    return dispatch => {
        return ajax.post('/user/dismiss', {
            id: id
        });
    };
}
action.dismissUser = dismissUser;

/**
 * 重置密码
 * @param id
 * @returns {Function}
 */
function resetPassword (id) {
    return dispatch => {
        return ajax.post('/user/password-reset', {
            id: id,
            password: '123456'
        });
    };
}
action.resetPassword = resetPassword;

export default action;
