import { Row, Col, Card, Tag, Icon,Badge,Tooltip,Divider,Skeleton } from 'antd';
import ExCharts from 'components/ExCharts';
import React from 'react';
import { connect } from 'react-redux';

class FirstCard extends React.Component {
    render () {
        const { width, height, id, firstChartData: chartData } = this.props;
        return (
            <Card
                className={'card firstCard'}
                title={
                    <div>
                        <Skeleton loading={!chartData.option['title.text']} paragraph={false} title={{width:100}}>
                            {chartData.option['title.text']}
                            <Divider type={'vertical'}/>
                            <Tooltip placement={'top'} title={chartData.tooltip}>
                                <Icon type="question-circle" />
                            </Tooltip>
                        </Skeleton>
                    </div>}
                hoverable={true}
            >
                <Row>
                    <Col xxl={19} style={{marginTop:10}}>
                        <ExCharts
                            container={id}
                            theme={'vintage'}
                            option={{ type: 'normal-line' }}
                            chartOption={chartData.option}
                            data={chartData.data}
                            width={'100%'}
                            minHeight={250}
                        />
                    </Col>
                    <Col xxl={{span:4,offset:1}} >
                        <div className={'legendBlocks'}>
                            {
                                JSON.stringify(chartData.option)!='{}'?chartData.option.legend.data.map((o, i) => {
                                    const length = chartData.data[i].length;
                                    const lastCount = chartData.data[i][length-1];
                                    const preCount = chartData.data[i][length-2];
                                    let color = ~~lastCount>=~~preCount?'#f5222d':'#389e0d';
                                    let type = ~~lastCount>=~~preCount?'arrow-up':'arrow-down'
                                    return (
                                        <div className={'legendBlock'} key={i}>
                                            <div className={'top'}>
                                                {/*<Tag color={chartData.option.color[i]}/>*/}
                                                <Badge dot style={{backgroundColor:chartData.option.color[i],marginTop:10,marginRight:15,height:10,width:10}}/>
                                                {o}
                                            </div>
                                            <div className={'middle'}>{lastCount}K</div>
                                            <p className={'bottom'} style={{color: color}}>
                                                <Icon type={type} />
                                                {
                                                    ~~preCount==0||~~lastCount==0?100:(Math.abs(lastCount-preCount)*100/preCount).toFixed(2)
                                                }
                                                {/*{*/}
                                                    {/*[15.1,21.5,17.5][i]*/}
                                                {/*}*/}
                                                %
                                            </p>
                                        </div>
                                    );
                                }):''
                            }
                        </div>
                    </Col>
                </Row>
            </Card>
        );
    }
}

FirstCard = connect(state => {
    const { firstChartData } = state['dashboard'];
    return { firstChartData };
}, null)(FirstCard);

export default FirstCard;
