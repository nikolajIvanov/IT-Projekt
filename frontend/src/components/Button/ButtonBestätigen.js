import Button from "@material-ui/core/Button";
import React from 'react';

function ButtonBestätigen() {
    return (
        <div>
            <Button style={style.button}/>
        </div>
    );
}

export default ButtonBestätigen;

const style = {
    button :{
        backgroundColor: "black",
    }
}