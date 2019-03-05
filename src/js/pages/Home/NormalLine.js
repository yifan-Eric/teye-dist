/**
 * Created by user on 18-8-10.
 */
import React from 'react';
import ExCharts from 'components/ExCharts';
import { connect } from 'react-redux';

class NormalLine extends React.Component {
    handleClick = (time, value) => {
        if (value){
            this.props.reHref(time, value);
        }
    };
    render () {
        const { width, height, id, thirdChartData: chartData } = this.props;
        return (
            <React.Fragment>
                <div onClick={this.handleClick}>
                    <ExCharts
                        container={id}
                        option={{ type: 'normal-line' }}
                        chartOption={chartData.option}
                        data={chartData.data}
                        width={width}
                        minHeight={height}
                        onClick={this.handleClick}
                    />
                </div>
            </React.Fragment>
        );
    }
}

NormalLine = connect(state => {
    const { thirdChartData } = state['home'];
    return { thirdChartData };
}, dispatch => ({
    reHref(time,value){
        dispatch({type:'HOME_THIRDSUBPAGE_SHOW',subPageShow:true,time:time,value:value});
    }
}))(NormalLine);

export default NormalLine;
