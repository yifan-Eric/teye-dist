import {Carousel} from 'antd';
import ExCharts from 'components/ExCharts';
import {connect} from 'react-redux';
import BubbleChart from './BubbleChart';

const geoCoordMap = {
    '中国': [116.46, 39.92],
    '美国': [-77.01, 38.91],
    '法国': [2.20, 42.52]
};
const mockData = [{ name: '中国', value: 300 },
    { name: '美国', value: 800 },
    { name: '法国', value: 500 }]

let convertData = function (data) {
    var res = [];
    for (var i = 0; i < data.length; i++) {
        var geoCoord = geoCoordMap[data[i].name];
        if (geoCoord) {
            res.push(geoCoord.concat(data[i].value));
        }
    }
    return res;
};

class FullScreenMode extends React.PureComponent{
    onChange = () => {

    }
    render(){
        const bodyHeight = document.body.clientHeight;
        const {mapChartData,bubbleChartData,selectedCountry,firstChartData} = this.props;
        return(
            <div style={{width:'100%'}}>
                <Carousel afterChange={this.onChange}>
                    <div style={{width:'100%'}}>
                        <ExCharts
                            container={'full-heat-map'}
                            option={{
                                type: 'heat-map' ,
                                selectedCountry:selectedCountry,
                            }}
                            data={convertData(mockData)}
                            chartOption={mapChartData.option}
                            width={'100%'}
                            minHeight={(bodyHeight-100)*0.9}
                        />
                    </div>
                    <div style={{width:'100%'}}>
                        <BubbleChart id={'full-bubble-chart'}  width={'100%'} height={(bodyHeight-100)*0.9}/>
                    </div>
                    <div></div>
                </Carousel>
            </div>
        )
    }
}
FullScreenMode = connect(state=>{
    const {mapChartData,bubbleChartData,firstChartData,selectedCountry} = state['home'];
    return {mapChartData,bubbleChartData,firstChartData,selectedCountry};
},null)(FullScreenMode)

export default FullScreenMode;