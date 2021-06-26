import SendIcon from '@material-ui/icons/Send';
import React from 'react';

function SendenIcon(props) {
    return (
        <div>
            <SendIcon onClick={props.onClick}/>
        </div>
    );
}

export default SendenIcon;