import Toolbar from '../Dashboard/Toolbar';
import {connect} from 'react-redux';
import {Spin,Tabs} from "antd";
import Table1 from './Table1';
import Table2 from './Table2';
import action from 'actions/conversions';
import dashAction from 'actions/dashboard';
import appAction from 'actions/app';
require('less/conversions.less');

const TabPane = Tabs.TabPane;

class Conversions extends React.Component{
    constructor(props){
        super(props);
    }
    componentWillMount(){
        this.props.init(this.props.searchParams.appName);
    }
    render(){
        // const loading = false;
        const {loading,productList,appVersions} = this.props;
        return (
            <div className="conversions-container head-toolbar display-flex flex-column">
                {
                    productList.length>0&&appVersions.length>0&&<Toolbar/>
                }
                <div className="flex-grow-1 display-flex">
                    <div className="bd flex-grow-1" style={{overflow:'auto',padding:0}}>
                        {
                            loading ? (
                                <div style={{ textAlign: 'center', paddingTop: 100 }}><Spin/></div>
                            ) :<div className={'container-content'}>
                                <Tabs defaultActiveKey="1" >
                                    <TabPane tab="转化事件" key="1">
                                        <Table1/>
                                    </TabPane>
                                    <TabPane tab="投放网络设置" key="2">
                                        <Table2/>
                                    </TabPane>
                                </Tabs>
                                </div>
                        }
                    </div>
                </div>
            </div>
        )
    }
}
Conversions = connect(state=>{
    const {loading} = state['conversions'];
    const {productList,appVersions,searchParams} = state['dashboard'];
    return {loading,productList,appVersions,searchParams};
},dispatch=>({
    init(packageName){
        dispatch(appAction.getSearchParamsFromLocalStorage()).then(searchParams=>{
            const _appName = searchParams?searchParams.appName:packageName;
            dispatch({type:'CONVERSIONS_LOADING',loading:true})
            Promise.all([ 
                dispatch(dashAction.loadApps()),
                dispatch(dashAction.loadAppVersions(_appName)),
            ]).then(()=>{
                dispatch(action.loadHotEvents()).then(()=>{
                    dispatch({type:'CONVERSIONS_LOADING',loading:false});
                    dispatch(action.loadFirstTable());
                })
            })
        })
    }
}))(Conversions);

module.exports = Conversions;
