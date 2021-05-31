import Button from "@material-ui/core/Button";
import CloseIcon from '@material-ui/icons/Close';
import React from 'react';

function tag(props) {
    return (
        <div>
            <Button
                style={style.button}>{props.inhalt}<CloseIcon onClick={props.onClick}/></Button>
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