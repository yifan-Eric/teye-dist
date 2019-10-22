import ExTable from 'components/ExTable';
import {connect} from 'react-redux';
import {Button,Icon} from 'antd';
import SearchModal from './SearchModal1';
import action from 'actions/conversions';

class Table1 extends React.Component{
    constructor(props){
        super(props);
        this.columns = [
            {title:'转化名称',dataIndex:'con-name'},
            {title:'计数',dataIndex:'count'},
            {title:'%',dataIndex:'count-per'},
            {title:'价值',dataIndex:'value'},
            {title:'%',dataIndex:'value-per'},
            {title:'标记为转化',dataIndex:'con-flag'}
        ];
        this.state = {
            searchModalShow:false
        }
    }
    handleClick = () => {
        this.setState({searchModalShow:true});
    }
    render(){
        const {firstTableData:data,onSearch} = this.props;
        return (
            <React.Fragment>
                <div className={'tool-bar'}>
                    <Button onClick={this.handleClick}><Icon type={'search'}/>查询</Button>
                    <Button><Icon type={'download'}/>下载CSV文件</Button>
                    <Button type={'primary'}>新建转化事件</Button>
                </div>
                <SearchModal
                    show={this.state.searchModalShow}
                    onClose={()=>this.setState({searchModalShow:false})}
                    onSearch={onSearch}
                />
                <div >
                    <ExTable
                        loading={false}
                        columns={this.columns}
                        dataSource={data}
                        bordered={false}
                        size={'small'}
                    />
                </div>
            </React.Fragment>
        )
    }
}

Table1 = connect(state=>{
    const {firstTableData} = state['conversions'];
    return {firstTableData};
},dispatch => ({
    onSearch(params){
        dispatch({ type: 'CONVERSIONS_SEARCHPARAMS_CHANGE', params });
        dispatch(action.loadFirstTable());
    }
}))(Table1);

export default Table1;
