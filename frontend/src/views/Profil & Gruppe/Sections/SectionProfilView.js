import React, {useEffect} from 'react';
import Typography from "@material-ui/core/Typography";
import theme from "../../../theme";
import ProfilAvatar from "../../../components/Avatar/ProfilAvatar";
import {useHistory} from "react-router-dom";

function SectionProfilView(props) {
    const[win, setWindow] = React.useState('')

    useEffect(() => {
        window.addEventListener('resize', handleResize);
    },[])

    function handleResize() {
        setWindow(window.innerWidth);
    }

    return (
        <div style={theme.card}>
            <ProfilAvatar img={props.apiObject.getProfilBild()}/>
            <Typography>{props.apiObject.getVorname()}</Typography>
            <Typography>{props.apiObject.getName()}</Typography>
            <Typography>{props.apiObject.getBeschreibung()}</Typography>
            <Typography>{props.apiObject.getStudiengang()}</Typography>
            <Typography>{props.apiObject.getSemester()}</Typography>
            <Typography>{props.apiObject.getModul()}</Typography>
            <Typography>{props.apiObject.getLerntyp()}</Typography>
        </div>
    );
}

export default SectionProfilView;