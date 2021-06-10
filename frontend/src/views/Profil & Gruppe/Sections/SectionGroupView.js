import React, {useEffect} from 'react';
import Typography from "@material-ui/core/Typography";
import theme from "../../../theme";
import ProfilAvatar from "../../../components/Avatar/ProfilAvatar";

function SectionGroupView(props) {
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
            <Typography>{props.apiObject.getName()}</Typography>
            <Typography>{props.apiObject.getBeschreibung()}</Typography>
            <Typography>{props.apiObject.getModul()[0]}</Typography>
            <Typography>{props.apiObject.getLerntyp()}</Typography>
        </div>
    );
}

export default SectionGroupView;