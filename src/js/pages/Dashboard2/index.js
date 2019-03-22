import {Row, Col, Button, Card, Spin,Select,Icon,Divider,Tag} from 'antd'
import { connect } from 'react-redux';
import action from 'actions/dashboard2';
import 'less/dashboard_2.less';
import DetailPage from './DetailPage';
// import SearchModal from './SearchModal';
// import moment from 'moment';
import Toolbar from "./Toolbar";


class Dashboard2 extends React.Component {
    constructor(props){
        super(props);
        // document.addEventListener('message',(e)=>{
        //     window.postMessage(e.data+'aaa');
        //     this.initDataFromRN(JSON.parse(e.data));
        // });
        this.state = {text:''}
    }

    componentWillMount () {
        this.props.init();
        this.props.loading();
    }
    initDataFromRN = (data) => {
        this.setState({text:JSON.stringify(data)})
    }

    render () {
        const {selectedProduct,selectedCountry,onSearch,detailPageLoading:loading} = this.props;
        return (
            <React.Fragment>
                <div className="head-toolbar display-flex flex-column">
                    {/*<p>{this.state.text||'abc'}</p>*/}
                    {/*<Button onClick={window.postMessage('test')}>aa</Button>*/}
                    <Toolbar/>
                    <div className="flex-grow-1 display-flex" >
                        <div className="bd flex-grow-1" >
                            {
                                loading ? (
                                    <div style={{ textAlign: 'center', paddingTop: 100 }}><Spin/></div>
                                ) : <DetailPage selectedCountry={selectedCountry} selectedProduct={selectedProduct}/>
                            }
                        </div>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}
Dashboard2 = connect(state=>{
    const {selectedProduct,selectedCountry,detailPageLoading} = state['dashboard2'];
    return {selectedProduct,selectedCountry,detailPageLoading};
}, dispatch => ({
    init () {
        // dispatch(action.loadProducts());
        // dispatch(action.loadAppVersions());
    },
    //延个时，不然图表会出问题，暂时这么解决
    loading(){
        dispatch({type:'DASHBOARD2_DETAILPAGE_LOADING',detailPageLoading:true})
        setTimeout(function(){dispatch({type:'DASHBOARD2_DETAILPAGE_LOADING',detailPageLoading:false});},500)
    }
}))(Dashboard2);

module.exports = Dashboard2;