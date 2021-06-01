import Button from "@material-ui/core/Button";
import React from 'react';

function tag(props) {
    return (
        <div>
            <Button
                onClick={props.onClick}
                style={style.button}>{props.inhalt}</Button>
        </div>
    );
}

export default tag;

const style = {
    button :{
        backgroundColor: "lightgrey",
        color: "black",
        size: "small",
    }
}