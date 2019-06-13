import { Collapse, Icon, Select,List ,Typography,Popconfirm,Button} from 'antd';
import {connect} from 'react-redux';
import AppEditModal from './AppEditModal';
import VersionEditModal from './VersionEditModal';
import action from 'actions/appMgr';

const { Panel } = Collapse;
const { Option } = Select;


class AppMgr extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            activeKey:'',
            appEditModalState:'add',//app编辑框状态：add新增，edit编辑
            versionEditModalState:'add'
        }
    }

    componentDidMount(){
        this.props.init();
    }

    genExtra = (o) => (
        <div>
            <Icon
                type="plus"
                style={{color:'#1890ff',marginRight:10}}
                onClick={event => {
                    event.stopPropagation();
                    this.setState({versionEditModalState:'add'});
                    this.props.resetVersionEditModal();
                    this.props.changeVersionEditModalData({
                        appId:o.id,
                        versionId:null,
                        versionName:''
                    })
                    this.props.handleVersionEditModalVisibility(true);
                }}
            />
            <Icon
                type="edit"
                style={{color:'#1890ff',marginRight:10}}
                onClick={event => {
                    event.stopPropagation();
                    this.setState({appEditModalState:'edit'});
                    this.props.changeAppEditModalData(o);
                    this.props.handleAppEditModalVisibility(true);
                }}
            />
            <Popconfirm title="确定删除?" onConfirm={() => this.props.handleAppDelete(o.id)}>
                <Icon
                    type="delete"
                    style={{color:'#f5222d'}}
                    onClick={event => {
                        event.stopPropagation();
                    }}
                />
            </Popconfirm>
        </div>

    )


    render() {
        const {productList,appVersionList,loadAppVersion,
            handleAppEditModalVisibility,handleVersionEditModalVisibility,resetAppEditModal} = this.props;
        return (
            <React.Fragment>
                <Button
                    type={'primary'}
                    style={{marginBottom:10}}
                    onClick={()=>{
                        this.setState({appEditModalState:'add'});
                        resetAppEditModal();
                        handleAppEditModalVisibility(true);
                    }}>新增App</Button>
                <AppEditModal
                    modalState={this.state.appEditModalState}
                    onClose={()=>handleAppEditModalVisibility(false)}
                />
                <VersionEditModal
                    modalState={this.state.versionEditModalState}
                    onClose={()=>handleVersionEditModalVisibility(false)}
                />
                <div style={{width:400}}>
                    <Collapse
                        activeKey={this.state.activeKey}
                        onChange={(key)=>{this.setState({activeKey: key});loadAppVersion(key)}}
                        accordion
                    >
                        {
                            productList.map(o=>{
                                return (
                                    <Panel header={o.name+'('+o.packageName+')'} key={o.id} extra={this.genExtra(o)}>
                                        {
                                            this.state.activeKey==o.id&&appVersionList.length>0?
                                                <List
                                                    dataSource={appVersionList}
                                                    renderItem={item => (
                                                        <List.Item>
                                                            <div style={{width:'100%',display:'flex',justifyContent:'space-between'}}>
                                                                {item.name}
                                                                <div>
                                                                    <Icon
                                                                        type="edit"
                                                                        style={{color:'#1890ff',marginRight:10}}
                                                                        onClick={event => {
                                                                            event.stopPropagation();
                                                                            this.setState({versionEditModalState:'edit'});
                                                                            this.props.changeVersionEditModalData({
                                                                                appId:o.id,
                                                                                versionId:item.versionId,
                                                                                versionName:item.name
                                                                            });
                                                                            this.props.handleVersionEditModalVisibility(true);
                                                                        }}
                                                                    />
                                                                    <Popconfirm title="确定删除?" onConfirm={() => this.props.handleVersionDelete(o.id,item.versionId)}>
                                                                        <Icon
                                                                            type="delete"
                                                                            style={{color:'#f5222d'}}
                                                                            onClick={event => {
                                                                                event.stopPropagation();
                                                                            }}
                                                                        />
                                                                    </Popconfirm>
                                                                </div>
                                                            </div>
                                                        </List.Item>
                                                    )}
                                                />:
                                                ''
                                        }
                                    </Panel>
                                )
                            })
                        }
                    </Collapse>
                </div>
            </React.Fragment>
        );
    }
}

AppMgr = connect(state=>{
    const {productList,appVersionList} = state['appMgr'];
    return {productList,appVersionList};
},dispatch=>({
    init(){
        dispatch(action.loadApps());
    },
    loadAppVersion(id){
        dispatch(action.loadAppVersions(id));
    },
    handleAppDelete(id){
        dispatch(action.deleteApp(id));
    },
    handleVersionDelete(appId,id){
        dispatch(action.deleteVersion(appId,id));
    },
    handleAppEditModalVisibility(show){
       dispatch({type:"APPMGR_APPEDITMODAL_SHOW",show:show});
    },
    handleVersionEditModalVisibility(show){
        dispatch({type:"APPMGR_VERSIONEDITMODAL_SHOW",show:show});
    },
    resetAppEditModal(){
        dispatch({type:'APPMGR_APPEDITDATA_RESET'});
    },
    changeAppEditModalData(data){
        data.appName = data.name;
        dispatch({type:'APPMGR_APPEDITDATA_CHANGE',data})
    },
    resetVersionEditModal(){
        dispatch({type:'APPMGR_VERSIONEDITDATA_RESET'});
    },
    changeVersionEditModalData(data){
        dispatch({type:'APPMGR_VERSIONEDITDATA_CHANGE',data})
    }
}))(AppMgr);

module.exports = AppMgr;