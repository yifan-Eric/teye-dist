import {connect} from 'react-redux';
import action from 'actions/dashboard2';
import SubPage from 'components/App/SubPage';
import {Col, Row} from "antd";
import RegionMapCard from './RegionMapCard';
import SecondCard from './SecondCard';
import ThirdCard from './ThirdCard';

class DetailPage extends React.PureComponent {
    constructor(props){
        super(props);
    }
    componentWillMount(){
        this.props.init(this.props.selectedCountry,this.props.data);
    }
    render(){
        const {show,title,onClose,selectedCountry,data} = this.props;
        return (
            <React.Fragment>
                <SubPage
                    show={show}
                    title={title||'world'}
                    onClose={onClose}
                >
                    <div className={'dash-container2'}>
                        <Row gutter={12}>
                            <Col lg={{span:12}} xxl={{span:10,offset:2}}>
                                <RegionMapCard id={selectedCountry||'moriarty'} country={selectedCountry}/>
                            </Col>
                            <Col lg={{span:12}} xxl={{span:10}}>
                                <SecondCard id={'second'} exData={data}/>
                            </Col>
                        </Row>
                    </div>
                </SubPage>
            </React.Fragment>
        )
    }
}
DetailPage = connect(null,dispatch=>({
    init(country,secondExData){
        dispatch(action.loadRegionData(country));
        dispatch(action.loadSecondData(secondExData));
    }
}))(DetailPage);

export default DetailPage;