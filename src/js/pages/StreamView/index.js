import Toolbar from '../Dashboard/Toolbar';
import HeatMap from './HeatMap';
import {connect} from 'react-redux';
import BottomBar from './BottomBar';
import {Spin} from "antd";
import dashAction from 'actions/dashboard';
require('less/streamView.less');

class StreamView extends React.Component{
    constructor(props){
        super(props);
    }
    componentDidMount(){
        this.props.init(this.props.searchParams.appName);
    }
    render(){
        const {loading,productList,appVersions} = this.props;
        return (
            <div className="streamView-container head-toolbar display-flex flex-column">
                {
                    productList.length>0&&appVersions.length>0&&<Toolbar/>
                }
                <div className="flex-grow-1 display-flex">
                    <div className="bd flex-grow-1" style={{overflow:'auto',padding:0}}>
                        {
                            loading ? (
                                <div style={{ textAlign: 'center', paddingTop: 100 }}><Spin/></div>
                            ) : <HeatMap/>
                        }
                    </div>
                </div>
                <BottomBar/>
            </div>
        )
    }
}
StreamView = connect(state=>{
    const {loading} = state['streamView'];
    const {productList,appVersions,searchParams} = state['dashboard'];
    return {loading,productList,appVersions,searchParams};
},dispatch=>({
    init(packageName){
        dispatch({type:'STREAMVIEW_LOADING',loading:true})
        Promise.all([
            dispatch(dashAction.loadApps()),
            dispatch(dashAction.loadAppVersions(packageName))
        ]).then(()=>{
            dispatch({type:'STREAMVIEW_LOADING',loading:false});
            dispatch(dashAction.loadSecondChart());
        })
    }
}))(StreamView);

module.exports = StreamView;
