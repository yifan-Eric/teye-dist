import {Row, Col, Button, Card, Spin,Select,Icon,Divider,Tag} from 'antd'
import { connect } from 'react-redux';
import action from 'actions/dashboard';
import appAction from 'actions/app';
import 'less/dashboard.less';
import DetailPage from './DetailPage';
import Toolbar from "./Toolbar"



class Dashboard extends React.Component {
    constructor(props){
        super(props);
    }

    componentDidMount(){
        this.props.init(this.props.searchParams.appName);
    }

    render () {
        const {subPageShow:show,selectedProduct,onClose,onSearch,detailPageLoading:loading,productList,appVersions} = this.props;
        return (
            <React.Fragment>
                <div className="head-toolbar display-flex flex-column">
                    {
                        //确保在加载完productList和appVersions后再加载Toolbar
                        productList.length>0&&appVersions.length>0&&<Toolbar/>
                    }
                    <div className="flex-grow-1 display-flex" >
                        <div className="bd flex-grow-1" >
                            {
                                loading ? (
                                    <div style={{ textAlign: 'center', paddingTop: 100 }}><Spin/></div>
                                ) : <DetailPage show={show} selectedProduct={selectedProduct} onClose={onClose}/>
                            }
                        </div>
                    </div>
                </div>
            </React.Fragment>

        );
    }
}
Dashboard = connect(state=>{
    const {subPageShow,selectedProduct,timeTypeList,timeType,detailPageLoading,searchParams,appVersions,productList} = state['dashboard'];
    return {subPageShow,selectedProduct,timeTypeList,timeType,detailPageLoading,searchParams,appVersions,productList};
}, dispatch => ({
    init (appName) {
        dispatch(appAction.getSearchParamsFromLocalStorage()).then(searchParams=>{
            const _appName = searchParams?searchParams.appName:appName;
            dispatch({type:'DASHBOARD_DETAILPAGE_LOADING',detailPageLoading:true})
            Promise.all([dispatch(action.loadApps()),dispatch(action.loadAppVersions(_appName))]).then(()=>{
                dispatch(action.refreshPage());
                dispatch({type:'DASHBOARD_DETAILPAGE_LOADING',detailPageLoading:false});
            })
        })
    }
}))(Dashboard);

module.exports = Dashboard;