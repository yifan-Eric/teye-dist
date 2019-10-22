import { connect } from 'react-redux';
import ExFormItem from 'components/ExFormItem';
import ExModal from 'components/ExModal';
import { Form } from 'antd';
import action from 'actions/dashboard';

const SearchForm = Form.create({
    onValuesChange(props, changedFields) {
        var changed = Object.keys(changedFields).map(o=>{
            var obj = new Object();
            obj[o] = changedFields[o].value;
            return obj;
        })
        // props.onChange(props.searchParams,changed[0]);
        props.onChange(props.searchParams,changedFields)
    },
    mapPropsToFields: (props) => {
        const params = props.searchParams;
        return {
            appName:Form.createFormField({ value: params.appName }),
            appVersion: Form.createFormField({ value: params.appVersion }),
        };
    }
})(props => {
    const { form,appVersions,prodList } = props;
    const { getFieldDecorator } = form;
    return (
        <Form>
            <ExFormItem type={'select'} label={'Stream'} name={'appName'} noClear={true} list={prodList} getFieldDecorator={getFieldDecorator}/>
            <ExFormItem mode={'multiple'} type={'select'} label={'App Version'} name={'appVersion'} noClear={true} list={appVersions} withEmpty={true} getFieldDecorator={getFieldDecorator}/>
        </Form>
    );
});

class SearchModal extends React.Component {
    constructor(props){
        super(props);
        //搜索框需要复制一份searchParams作为state,不能干扰store里面的searchParams
        this.state = {searchParams:props.searchParams}
    }
    handleSave = () => {
        const form = this.form;
        form.validateFields((err, data) => {
            if (err) { return; }
            this.props.onSearch({...this.state.searchParams,...data});
            this.props.onClose();
        });
    }
    saveFormRef = (form) => {
        this.form = form;
    }
    fieldsOnChange = (props,changeFields) => {
        console.log('changeFields',changeFields)
        var newData = {...props,...changeFields};

        if(changeFields.hasOwnProperty('appName')){
            this.props.refreshAppVersion(changeFields['appName']);
            newData.appVersion = [];
        }
        this.setState({searchParams: newData});
    }

    render () {
        const { show, onClose,appVersions,productList } = this.props;
        return (
            <ExModal
                visible={show}
                title={'Search Item'}
                onCancel={onClose}
                onOk={this.handleSave}
            >
                <SearchForm
                    ref={this.saveFormRef}
                    searchParams={this.state.searchParams}
                    appVersions={appVersions}
                    prodList={productList}
                    onChange={this.fieldsOnChange}
                />
            </ExModal>
        );
    }
}

SearchModal = connect(state => {
    const { appVersions,productList } = state['dashboard'];
    return { appVersions,productList };
}, dispatch=>({
    refreshAppVersion(appId){
        dispatch(action.loadAppVersions(appId));
    }
}))(SearchModal);

export default SearchModal;
