import Button from "@material-ui/core/Button";
import React from 'react';

function ButtonBestätigen(props) {
    return (
        <div>
            <Button
                onClick={props.onClick}
                style={style.button}>{props.inhalt}</Button>
        </div>
    );
}

export default ButtonBestätigen;

const style = {
    button :{
        backgroundColor: "black",
        color: "white"
    }
}