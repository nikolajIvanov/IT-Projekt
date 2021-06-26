import React from 'react';

function Header(props) {
    return (
        <div>
            <h1 className="header">{props.inhalt}</h1>
        </div>
    );
}

export default Header;