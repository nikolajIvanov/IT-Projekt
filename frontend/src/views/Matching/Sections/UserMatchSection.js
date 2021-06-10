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

    return (
        <div>
            <div>
                <Paper square elevation={0} style={theme.root}>
                    <Grid style={theme.root} container spacing={3}>
                        <Grid style={theme.rightAligned} item xs={4} sm={4}>
                            <Typography>{props.apiUsers[activeStep].getVorname()}</Typography>
                        </Grid>
                        <Grid style={theme.root} item xs={4} sm={4}>
                            <Typography>{props.apiUsers[activeStep].getName()}</Typography>
                        </Grid>
                        <Grid style={theme.leftAligned} item xs={4} sm={4}>
                            <Typography>{props.apiUsers[activeStep].getGeburtstag()}</Typography>
                        </Grid>
                    </Grid>
                </Paper>
                <Paper square elevation={0} style={theme.card}>
                    <Typography>{props.apiUsers[activeStep].getStudiengang()}</Typography>
                </Paper>
                <MobileStepper
                    position="static"
                    nextButton={
                        <Button size="small" onClick={handleYes} disabled={activeStep === props.apiUsers.length -1}>
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