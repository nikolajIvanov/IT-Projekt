import Button from "@material-ui/core/Button";
import CloseIcon from '@material-ui/icons/Close';
import React from 'react';

function tag(props) {
    return (
        <div>
            <Button
                onClick={props.onClick}
                style={style.button}>{props.inhalt}<CloseIcon/></Button>
        </div>
    );
}

export default tag;

const style = {
    button :{
        backgroundColor: "lightgrey",
        color: "black"
    }
}