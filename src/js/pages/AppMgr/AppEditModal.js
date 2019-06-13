import { connect } from 'react-redux';
import ExFormItem from 'components/ExFormItem';
import ExModal from 'components/ExModal';
import { Form } from 'antd';
import action from 'actions/appMgr';

const EditForm = Form.create({
    mapPropsToFields: (props) => {
        const params = props.appEditData;
        return {
            id: Form.createFormField({value: params.id}),
            appName: Form.createFormField({ value: params.appName }),
            packageName: Form.createFormField({ value: params.packageName})
        };
    }
})(props => {
    const { form } = props;
    const { getFieldDecorator } = form;
    return (
        <Form>
            <ExFormItem type={'hidden'} name={'id'} getFieldDecorator={getFieldDecorator}/>
            <ExFormItem label={'AppName'} name={'appName'} getFieldDecorator={getFieldDecorator}/>
            <ExFormItem label={'PackageName'} name={'packageName'} getFieldDecorator={getFieldDecorator}/>
        </Form>
    );
});

class AppEditModal extends React.Component {
    handleSave = () => {
        const form = this.form;
        const {modalState,handleAddApp,handleUpdateApp,onClose} = this.props;
        form.validateFields((err, data) => {
            if (err) { return; }
            modalState==='add'?handleAddApp(data):handleUpdateApp(data);
            onClose();
        });
    }
    saveFormRef = (form) => {
        this.form = form;
    }
    render () {
        const { appEditModalShow:show, onClose,modalState,appEditData} = this.props;
        return (
            <ExModal
                visible={show}
                title={modalState==='add'?'新增App':'编辑App'}
                onCancel={onClose}
                onOk={this.handleSave}
            >
                <EditForm ref={this.saveFormRef} appEditData={appEditData}/>
            </ExModal>
        );
    }
}

AppEditModal = connect(state => {
    const { appEditModalShow,appEditData } = state['appMgr'];
    return { appEditModalShow,appEditData };
}, dispatch=>({
    handleAddApp(params){
        dispatch(action.addApp(params.appName,params.packageName));
    },
    handleUpdateApp(params){
        dispatch(action.updateApp(params.id,params.appName,params.packageName));
    }
}))(AppEditModal);

export default AppEditModal;
