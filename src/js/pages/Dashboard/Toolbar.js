import {connect} from 'react-redux';
import {Button, Divider, Icon, Select, Tag,Skeleton} from "antd";
import moment from 'moment';
import action from 'actions/dashboard';
import appAction from 'actions/app';
import 'less/theme/toolbar.less';
import SearchModal from "./SearchModal";
import { isEmpty } from '../../utils';

const docWidth = document.body.clientWidth;
let btnText ,inputWidth,btnShape;
if(docWidth<960)
    btnText = '',btnShape = 'circle',inputWidth = 140;
else
    btnText = 'Add Filter',btnShape = 'round',inputWidth = 200;

class Toolbar extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            searchModalShow:false
        };
    }
    getDateRange = (id) => {
        return moment().subtract(id, "days").format('YYYY年MM月DD日')+'~'+moment().subtract(1, "days").format('YYYY年MM月DD日')
    }

    handleTagClick = (key) => {
        let temp = {};
        temp[key] = '';
        this.props.onSearch({...this.props.searchParams,...temp});
    }

    handleTimeRangeChange = (value) => {
        this.props.onSearch({...this.props.searchParams,...{dateRange:value}});
    }

    shouldComponentUpdate(nextProps,nextState){
        let shouldUpdate = false;
        Object.keys(nextProps.searchParams).forEach(o=>{
            if(nextProps.searchParams[o]!==this.props.searchParams[o])
                shouldUpdate = true;
        })
        if(nextState.searchModalShow!==this.state.searchModalShow)
            shouldUpdate = true;
        return shouldUpdate;
    }

    render(){
        const {searchParams,appVersions,timeTypeList,productList,onSearch,exComp} = this.props;
        const dataMap = {
            appVersion:appVersions,
            appName:productList
        }
        //将属性的值为数组的项依次提取出
        let _searchParams = {}
        Object.keys(searchParams).forEach(o=>{
            if(typeof(searchParams[o])!=='object'){
                _searchParams[o] = searchParams[o];
            }else{
                searchParams[o].toString().split(',').forEach((item,i)=>{
                    _searchParams[o+i] = item;
                })
            }
        })
        return (
            <div className="hd">
                <SearchModal
                    show={this.state.searchModalShow}
                    onClose={()=>this.setState({searchModalShow: false})}
                    onSearch={onSearch}
                    searchParams={searchParams}
                />
                <div className="actions">
                    {exComp}

                    <Button type={"dashed"} shape={btnShape} onClick={()=>this.setState({searchModalShow:true})}>{btnText}
                    <Icon type={'plus'} style={{marginLeft:0}}/>
                    </Button>
                    <Divider type={'vertical'}/>
                    {
                        Object.keys(_searchParams).map(o=>{
                            if(_searchParams[o]!==''&&appVersions.length&&productList.length&&o!='dateRange'){
                                let target = dataMap[o.replace(/\d/,'')].find(item=>item.id===_searchParams[o]);
                                return isEmpty(target)?'':<Tag
                                    //暂时不允许关闭，参数之间存在父子关系
                                    // closable
                                    visible={true}
                                    color="#108ee9"
                                    key={o}
                                    onClose={this.handleTagClick.bind(this,o)}
                                    style={{maxWidth:150}}
                                >
                                    {target.name}
                                </Tag>
                            }
                            return '';
                        })
                    }
                </div>
                {/*<span className="text-lg">*/}
                    {/*{productList.length&&searchParams['appName']!==''?productList.find(item=>item.id===searchParams['appName']).name:<br/>}*/}
                {/*</span>*/}
                <span><br/></span>
                <div className={'tail'}>
                    <div className={'tail-content'}>
                        <div>
                            <Icon type="calendar" theme="filled" style={{width:'2rem'}}/>
                            <Select value={searchParams.dateRange} style={{width:inputWidth}} onChange={this.handleTimeRangeChange}>
                                {
                                    timeTypeList.map(o=><Select.Option value={o.id} key={o.id}>{o.name}</Select.Option>)
                                }
                            </Select>
                        </div>
                        <p><Icon type="swap" />Compared to：{this.getDateRange(searchParams.dateRange)}</p>
                    </div>
                </div>
            </div>
        )
    }
}

Toolbar = connect(state=>{
    const {searchParams,appVersions,timeTypeList,productList} = state['dashboard'];
    return {searchParams,appVersions,timeTypeList,productList};
},dispatch=>({
    onSearch (params) {
        dispatch({type:'DASHBOARD_DETAILPAGE_LOADING',detailPageLoading:true})
        Promise.all([
            dispatch({ type: 'DASHBOARD_SEARCHPARAMS_CHANGE', params }),
            dispatch(action.refreshPage())
        ]).then(()=>{
            //请求成功就将当前查询条件存储到localStorage
            dispatch(appAction.setSearchParamsInLocalStorage(params,'DASHBOARD_SEARCHPARAMS_CHANGE'));
            dispatch({type:'DASHBOARD_DETAILPAGE_LOADING',detailPageLoading:false});
            // setTimeout(function(){dispatch({type:'DASHBOARD_DETAILPAGE_LOADING',detailPageLoading:false});},1000)
        })
    }
}))(Toolbar);

export default Toolbar;