import React, {useEffect} from 'react';
import Typography from "@material-ui/core/Typography";
import theme from "../../../theme";

function SectionProfilView(props) {
    const[win, setWindow] = React.useState('')

    useEffect(() => {
        window.addEventListener('resize', handleResize);
    },[])

    function handleResize() {
        setWindow(window.innerWidth);
    }

    return (
        <div style={theme.root}>
            <Typography>HI</Typography>
            {win > 700 ?
                <Typography>Kleiner{window.innerWidth}</Typography>
                :
                <Typography>Größer{window.innerWidth}</Typography>
            }
        </div>
    );
}

export default SectionProfilView;