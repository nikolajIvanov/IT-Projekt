import React from 'react';
import ProfilAvatar from "../../../components/Avatar/ProfilAvatar";
import Typography from '@material-ui/core/Typography';


function SectionAvatar(props) {
    return (
        <div style={styles.avatar}>
            <ProfilAvatar img={props.img}/>
            <Typography>{props.userName}</Typography>
        </div>
    );
}

export default SectionAvatar;

const styles = {
    avatar: {
        display: "flex",
        flexDirection: 'column',
        alignItems: "center",
        justifyContent: "center"
    }
}