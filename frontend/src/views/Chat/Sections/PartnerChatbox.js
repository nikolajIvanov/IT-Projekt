import React from 'react';

function PartnerChatbox(props) {
    return (
        <div className={props.class}>
            <p className="h3_bold">{props.inhalt}</p>
        </div>
    );
}

export default PartnerChatbox;