import { connect } from 'react-redux';
import ExFormItem from 'components/ExFormItem';
import ExModal from 'components/ExModal';
import { Form, message } from 'antd';
import moment from 'moment';

const SearchForm1 = Form.create({
    mapPropsToFields: (props) => {
        const params = props.searchParams;
        return {
            eventIds:Form.createFormField({value:params.eventIds}),
        };
    }
})(props => {
    const { form,events } = props;
    const { getFieldDecorator } = form;
    return (
        <Form>
            <ExFormItem  label={'EventIds'} name={'eventIds'} type={'select'} list={events} mode={'multiple'} getFieldDecorator={getFieldDecorator}/>
        </Form>
    );
});

class SearchModal1 extends React.Component {
    handleSave = () => {
        const form = this.form;
        form.validateFields((err, data) => {
            if (err) { return; }
            this.props.onSearch(data);
        });
    }
    saveFormRef = (form) => {
        this.form = form;
    }
    render () {
        const { show, onClose,events } = this.props;
        return (
            <ExModal
                visible={show}
                title={'查询条件'}
                onCancel={onClose}
                onOk={this.handleSave}
            >
                <SearchForm1
                    ref={this.saveFormRef}
                    searchParams={this.props.searchParams}
                    events={events}
                />
            </ExModal>
        );
    }
}

SearchModal1 = connect(state => {
    const { searchParams,events } = state['conversions'];
    return { searchParams,events};
}, null)(SearchModal1);

export default SearchModal1;
