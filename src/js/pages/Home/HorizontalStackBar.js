import ExCharts from 'components/ExCharts';
import { connect } from 'react-redux';

class HorizontalStackBar extends React.Component {
    handleClick = (e) => {
        this.props.reHref(e.name,e.seriesName);
    }
    render () {
        const { width, height, id, fourthChartData: chartData } = this.props;
        return (
            <React.Fragment>
                <ExCharts
                    container={id}
                    option={{ type: 'horizontal-stack-bar' }}
                    chartOption={chartData.option}
                    data={chartData.data}
                    width={width}
                    minHeight={height}
                    onClick={this.handleClick}
                />
            </React.Fragment>
        );
    }
}

HorizontalStackBar = connect(state => {
    const { fourthChartData } = state['home'];
    return { fourthChartData };
}, dispatch => ({
    reHref(time,type,country){
        dispatch({type:'HOME_FOURTHSUBPAGE_SHOW',subPageShow:true,time:time,actionType:type});
    }
}))(HorizontalStackBar);

export default HorizontalStackBar;
