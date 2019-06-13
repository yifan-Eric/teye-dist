import { connect } from 'react-redux';
import ExFormItem from 'components/ExFormItem';
import ExModal from 'components/ExModal';
import { Form } from 'antd';
import action from 'actions/appMgr';

const EditForm = Form.create({
    mapPropsToFields: (props) => {
        const params = props.versionEditData;
        console.log(params)
        return {
            appId: Form.createFormField({value: params.appId}),
            versionId: Form.createFormField({value:params.versionId}),
            versionName: Form.createFormField({ value: params.versionName }),
        };
    }
})(props => {
    const { form } = props;
    const { getFieldDecorator } = form;
    return (
        <Form>
            <ExFormItem type={'hidden'} name={'appId'} getFieldDecorator={getFieldDecorator}/>
            <ExFormItem type={'hidden'} name={'versionId'} getFieldDecorator={getFieldDecorator}/>
            <ExFormItem label={'VersionName'} name={'versionName'} getFieldDecorator={getFieldDecorator}/>
        </Form>
    );
});

class VersionEditModal extends React.Component {
    handleSave = () => {
        const form = this.form;
        const {modalState,handleAddVersion,handleUpdateVersion,onClose} = this.props;
        form.validateFields((err, data) => {
            if (err) { return; }
            modalState==='add'?handleAddVersion(data):handleUpdateVersion(data);
            onClose();
        });
    }
    saveFormRef = (form) => {
        this.form = form;
    }
    render () {
        const { versionEditModalShow:show, onClose,modalState,versionEditData} = this.props;
        return (
            <ExModal
                visible={show}
                title={modalState==='add'?'新增Version':'编辑Version'}
                onCancel={onClose}
                onOk={this.handleSave}
            >
                <EditForm ref={this.saveFormRef} versionEditData={versionEditData}/>
            </ExModal>
        );
    }
}

VersionEditModal = connect(state => {
    const { versionEditModalShow,versionEditData } = state['appMgr'];
    return { versionEditModalShow,versionEditData };
}, dispatch=>({
    handleAddVersion(params){
        dispatch(action.addVersion(params.appId,params.versionName));
    },
    handleUpdateVersion(params){
        dispatch(action.updateVersion(params.appId,params.versionId,params.versionName));
    }
}))(VersionEditModal);

export default VersionEditModal;
