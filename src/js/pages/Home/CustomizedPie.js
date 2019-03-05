/**
 * Created by user on 18-8-20.
 */
import React from 'react';
import ExCharts from 'components/ExCharts';
import { connect } from 'react-redux';

class CustomizedPie extends React.PureComponent {
    handleClick = (e) => {
        this.props.reHref(e.data.name);
    }
    render () {
        const { width, height, id, secondChartData: chartData } = this.props;
        return (
            <React.Fragment>
                <ExCharts
                    container={id}
                    option={{ type: 'customized-pie' }}
                    data={chartData.data}
                    chartOption={chartData.option}
                    width={width}
                    minHeight={height}
                    onClick={this.handleClick}
                />
            </React.Fragment>
        );
    }
}
CustomizedPie = connect(state => {
    const { secondChartData } = state['home'];
    return { secondChartData };
}, dispatch => ({
    reHref(pain){
        dispatch({type:'HOME_SECONDSUBPAGE_SHOW',subPageShow:true,selectedProduct:pain});
    }
}))(CustomizedPie);

export default CustomizedPie;
