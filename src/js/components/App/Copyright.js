import goTop from 'tf-utils/dom/goTop';
import { Icon } from 'antd';
import { FormattedMessage } from 'react-intl';

class Copyright extends React.PureComponent {
    render () {
        return (
            <div className='copyright'>
                <span><FormattedMessage id={'copyright'}/> © 2018 All Rights Reserved {APP_NAME}</span>
                <a href="javascript:;"
                    onClick={() => { goTop(document.querySelector('.ant-tabs-tabpane-active.page-pane')); }}
                    title="返回顶部"
                    className="btn goTop">
                    <Icon type="up"/>
                </a>
            </div>
        );
    }
}

export default Copyright;
