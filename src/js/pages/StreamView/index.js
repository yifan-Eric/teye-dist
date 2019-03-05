import Toolbar from '../Dashboard/Toolbar';
import HeatMap from './HeatMap';
import {connect} from 'react-redux';
import BottomBar from './BottomBar';
import {Spin} from "antd";
require('less/streamView.less');

class StreamView extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        const loading = false;
        return (
            <div className="streamView-container head-toolbar display-flex flex-column">
                <Toolbar/>
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
StreamView = connect(null,null)(StreamView);

module.exports = StreamView;
