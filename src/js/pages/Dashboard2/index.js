import {Button} from 'antd';
import {connect} from 'react-redux';
import DetailPage from './DetailPage';
import 'less/dashboard_2.less';

class Dashboard2 extends React.PureComponent {
    componentWillMount(){

    }
    render(){
        const {handleClick,subPageShow,onClose} = this.props;
        return (
            <React.Fragment>
                {
                    subPageShow?
                        <DetailPage show={subPageShow} onClose={onClose}/>
                        :
                        <Button type={'primary'} onClick={handleClick}> Click </Button>
                }
            </React.Fragment>
        )
    }
}

Dashboard2 = connect(state=>{
    const {subPageShow} = state['dashboard2'];
    return {subPageShow};
},dispatch=>({
    handleClick(){
        dispatch({type:'DASHBOARD2_SUBPAGE_SHOW',subPageShow:true});
    },
    onClose() {
        dispatch({type:'DASHBOARD2_SUBPAGE_SHOW',subPageShow:false});
    }
}))(Dashboard2);

module.exports = Dashboard2;