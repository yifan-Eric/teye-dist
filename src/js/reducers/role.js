import { objectAppend } from 'utils';
/**
 * 每个容器组件对应一个reducer
 * 这里可以唯一知道新旧状态的地方
 */
const defaultState = {
    roleList: null,
    roleInfo: {}, // 当前选中的角色
    roleAuth: [], // 包含的菜单ID
    roleAuthObj:{"1":[{"menuId":"1"},{"menuId":"7"},{"menuId":"70"},{"menuId":"700","functions":["CREATE","UPDATE","DELETE"]},{"menuId":"701","functions":["CREATE","UPDATE","DELETE"]},{"menuId":"702","functions":["CREATE","UPDATE","DELETE"]},{"menuId":"703","functions":["CREATE","UPDATE","DELETE"]},{"menuId":"704","functions":["CREATE","UPDATE","DELETE"]},{"menuId":"705","functions":["CREATE","UPDATE","DELETE"]},{"menuId":"900","functions":["CREATE","UPDATE","DELETE"]}],"2":[{"menuId":"7"},{"menuId":"70"},{"menuId":"71"},{"menuId":"702","functions":["CREATE","UPDATE","DELETE"]},{"menuId":"703","functions":["CREATE","UPDATE","DELETE"]},{"menuId":"704","functions":["CREATE","UPDATE","DELETE"]},{"menuId":"705","functions":["CREATE","UPDATE","DELETE"]},{"menuId":"710","functions":["CREATE","UPDATE","DELETE"]},{"menuId":"711","functions":["CREATE","UPDATE","DELETE"]},{"menuId":"712","functions":["CREATE","UPDATE","DELETE"]},{"menuId":"900","functions":["CREATE","UPDATE","DELETE"]}]},
    editShow: false,
    editData: {},
    menuTree: []
};

export default (state, action) => {
    let newState = {};
    switch (action.type) {
    case 'ROLE_ADD':
        newState.editShow = true;
        newState.editData = {
            isNew: true,
            name: '',
            desc: ''
        };
        break;
    case 'ROLE_EDIT':
        newState.editShow = true;
        const { id, name, desc } = action.data;
        newState.editData = {
            id,
            name,
            desc
        };
        break;
    case 'ROLE_EDIT_CLOSE':
        newState.editShow = false;
        break;
    case 'ROLE_LIST':
        newState.roleList = action.list;
        break;
    case 'ROLE_SELECT':
        newState.roleInfo = action.role;
        break;
    case 'ROLE_MENU_LOADED':
        newState.roleAuth = action.roleAuth;
        break;
    case 'ROLE_MENU_TREE':
        newState.menuTree = action.data;
        break;
    case 'ROLE_MENU_CHK_CHANGE':
        newState.roleAuth = action.roleAuth;
        break;
    case 'ROLE_PAGE_LEAVE':
        return defaultState;
    case 'ROLE_AUTH_LIST_LOAD':
        newState.roleAuthObj = Object.assign({},state.roleAuthObj,{ [action.id]: action.data });
        console.log(JSON.stringify(newState.roleAuthObj))
        break;
    default:
        return state || defaultState;
    }
    return objectAppend(newState, state);
};
