import React from 'react';
import { connect } from 'react-redux';
import { showInfo } from 'store/common/alert';

class ChatContainer extends React.Component{
    render() {
        return (
            <div>
                <input type={'button'} onClick={this.send.bind(this)} value={'click'}/>
            </div>);
    }

    send() {
        this.props.dispatch(showInfo('Test message'));
    }
}

export default connect()(ChatContainer);
