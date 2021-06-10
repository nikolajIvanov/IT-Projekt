import React from 'react';
import MobileStepper from '@material-ui/core/MobileStepper';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import theme from "../../../theme";
import Grid from "@material-ui/core/Grid";
import {useHistory} from "react-router-dom";
import ProfilAvatar from "../../../components/Avatar/ProfilAvatar";
import H3_bold from "../../../components/Fonts/h3_bold";
import H2_bold from "../../../components/Fonts/h2_bold";


function UserMatchSection(props) {
    const [activeStep, setActiveStep] = React.useState(0);
    const redirect = useHistory()

    const handleYes = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
        props.getView(props.apiUsers[activeStep])
        redirect.push("/profil")
    };

    const handleNo = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const user = props.apiUsers[activeStep]

    return (
        <div>
            <div>
                <Paper square elevation={0} style={theme.matchCard.body}>
                    <Grid container spacing={3}>
                        <Grid className="root" item xs={12}>
                            <ProfilAvatar img={user.getProfilBild()}/>
                        </Grid>
                        <Grid style={theme.root} item xs={4} sm={4}>
                            <H2_bold inhalt={user.getVorname()}/>
                        </Grid>
                        <Grid style={theme.root} item xs={4} sm={4}>
                            <Typography>{user.getName()}</Typography>
                        </Grid>
                        <Grid style={theme.root} item xs={4} sm={4}>
                            <Typography>{user.getGeburtstag()}</Typography>
                        </Grid>
                    </Grid>
                </Paper>
                <Paper square elevation={0} style={theme.card}>
                    <Typography>{user.getStudiengang()}</Typography>
                </Paper>
                <MobileStepper
                    position="static"
                    nextButton={
                        <Button size="small" onClick={handleYes} disabled={activeStep === props.apiUsers.length }>
                            Gib mir
                            <KeyboardArrowRight />
                        </Button>
                    }
                    backButton={
                        <Button size="small" onClick={handleNo} disabled={activeStep === props.apiUsers.length -1}>
                            <KeyboardArrowLeft />
                            Nee
                        </Button>
                    }
                />
            </div>
        </div>
    );
}

export default UserMatchSection;