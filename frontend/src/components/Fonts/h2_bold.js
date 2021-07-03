import React from 'react';

function H2_bold(props) {
    return (
        <div onClick={props.onClick}>
            <p className="h2_bold">{props.inhalt}</p>
        </div>
    );
}

export default H2_bold;