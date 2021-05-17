import React from 'react';
import ProfilAvatar from "../../../components/Avatar/ProfilAvatar";
import Typography from '@material-ui/core/Typography';


function SectionAvatar(props) {
    return (
        <>
            <ProfilAvatar/>
            <Typography>{props.userName}</Typography>
        </>
    );
}

export default SectionAvatar;

const styles = {
    avatar: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
    }
}