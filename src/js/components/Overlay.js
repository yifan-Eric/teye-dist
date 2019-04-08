/**
 * React v16 createPortal的简单应用
 */

import ReactDOM from 'react-dom';
require('less/components/overlay.less');

class Overlay extends React.Component{
    constructor(props){
        super(props);
        this.container = document.createElement('div');
        document.body.appendChild(this.container);
    }
    componentWillUnmount(){
        document.body.removeChild(this.container);
    }
    render(){
        return ReactDOM.createPortal(
            <div className={'overlay'}>
                <span className='overlay-close' onClick={this.props.onClose}>&times;</span>
                {this.props.children}
            </div>,
            this.container
        )
    }
}

export default Overlay;