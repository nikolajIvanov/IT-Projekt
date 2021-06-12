import React from 'react';

function MyChatbox(props) {
    return (
        <div className={props.class}>
            <p className="h3_regular">{props.inhalt}</p>
        </div>
    );
}

export default MyChatbox;