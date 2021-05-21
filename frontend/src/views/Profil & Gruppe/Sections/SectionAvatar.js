import React from 'react';
import ProfilAvatar from "../../../components/Avatar/ProfilAvatar";
import Typography from '@material-ui/core/Typography';
import H1 from "../../../components/Typography/H1";


function SectionAvatar(props) {
    return (
        <div style={styles.avatar}>
            <ProfilAvatar img={props.img}/>
            <H1 text={props.text}/>
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