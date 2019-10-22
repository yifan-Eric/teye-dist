import ajax from 'utils/ajax';
let action = {};

/**
 * 获取菜单列表
 * @returns {Function}
 */
function loadList () {
    return (dispatch, getState) => {
        dispatch({ type: 'MENU_LOADING', loading: true });
        return new Promise((resolve, reject) => {
            let menuList = getState().menu.menuList;
            if (menuList) {
                resolve(menuList);
            } else {
                resolve(ajax.get('/menu'));
            }
        }).then(data => {
            let __data = JSON.parse(JSON.stringify(data));
            dispatch({ type: 'SAVE_MENU_LIST', menuList: __data });
            let menuList = [];
            let treeData = [{ name: '(根目录)', list: data }];

            // 递归添加<tr>
            function recursive (item) {
                // 忽略根目录那行functionfunction
                if (item.level > 0) {
                    menuList.push(item);
                }
                if (item.list && item.list.length) {
                    item.list.forEach(function (o, i, list) {
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
            }

            treeData.forEach((item, i, list) => {
                item.indents = []; // 体现菜单关系的缩进符
                item.level = 0; // 菜单深度级别，从0级开始
                item.last = i === list.length - 1; // 是否为当前级别的最后一个
                recursive(item);
            });

            dispatch({ type: 'MENU_LIST', list: menuList });
            dispatch({ type: 'MENU_LOADING' });
        });
    };
}
action.loadList = loadList;

function handleMenu (item, type, data) {
    if (item.id == data.parentId) {
        if (type === 'add') {
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
    } else {
        if (item.list) {
            item.list.forEach(i => handleMenu(i, type, data));
        }
    }
}

/**
 * 添加菜单
 * @param data
 * @returns {Function}
 */
action.addMenu = data => (dispatch, getState) => {
    let menuList = JSON.parse(JSON.stringify(getState().menu.menuList));
    data.id = (Math.random() * 100000).toFixed(0) / 1 + 1000000;

    if (data.parentId === 0) {
        menuList.push(data);
    } else {
        menuList.forEach(i => {
            handleMenu(i, 'add', data);
        });
    }
    menuList = JSON.parse(JSON.stringify(menuList));
    dispatch({ type: 'SAVE_MENU_LIST', menuList });
    return Promise.resolve();
};

/**
 * 更新菜单
 * @param data
 * @returns {Function}
 */
action.updateMenu = data => (dispatch, getState) => {
    let menuList = JSON.parse(JSON.stringify(getState().menu.menuList));
    if (data.parentId == 0) {
        let index = menuList.findIndex(i => i.id == data.id);
        let temp = menuList[index];
        temp = Object.assign({}, temp, data);
        menuList.splice(index, 1, temp);
    } else {
        menuList.forEach(i => {
            handleMenu(i, 'update', data);
        });
    }
    menuList = JSON.parse(JSON.stringify(menuList));
    dispatch({ type: 'SAVE_MENU_LIST', menuList });
    return Promise.resolve();
};

/**
 * 删除菜单
 * @param data
 * @returns {Function}
 */
action.deleteMenu = data => (dispatch, getState) => {
    let menuList = JSON.parse(JSON.stringify(getState().menu.menuList));
    if (data.parentId == 0) {
        let index = menuList.findIndex(i => i.id == data.id);
        menuList.splice(index, 1);
    } else {
        menuList.forEach(i => {
            handleMenu(i, 'delete', data);
        });
    }
    menuList = JSON.parse(JSON.stringify(menuList));
    dispatch({ type: 'SAVE_MENU_LIST', menuList });
    return Promise.resolve();
};

/**
 * 移动菜单
 * @param id
 * @param isUp 是否上移，否则下移
 * @returns {Function}
 */
action.moveMenu = (id, isUp) => dispatch => ajax.post(isUp ? '/menu/up' : '/menu/down', { id });

export default action;
