import React from 'react';
import MobileStepper from '@material-ui/core/MobileStepper';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import theme from "../../../theme";
import {useHistory} from "react-router-dom";


function GroupMatchSection(props) {
    const [activeStep, setActiveStep] = React.useState(0);
    const redirect = useHistory()

    const handleYes = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
        props.getView(props.apiGroups[activeStep])
        redirect.push("/gruppe")
    };

    const handleNo = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    return (
        <div>
            <div>
                <Paper square elevation={0} style={theme.root}>
                            <Typography>{props.apiGroups[activeStep].getName()}</Typography>
                </Paper>
                <Paper square elevation={0} style={theme.card}>
                    <Typography>{props.apiGroups[activeStep].getModul()[0]}</Typography>
                    <Typography>{props.apiGroups[activeStep].getBeschreibung()}</Typography>
                </Paper>
                <MobileStepper
                    position="static"
                    nextButton={
                        <Button size="small" onClick={handleYes} disabled={activeStep === props.apiGroups.length}>
                            Gib mir
                            <KeyboardArrowRight />
                        </Button>
                    }
                    backButton={
                        <Button size="small" onClick={handleNo} disabled={activeStep === props.apiGroups.length -1}>
                            <KeyboardArrowLeft />
                            Nee
                        </Button>
                    }
                />
            </div>
        </div>
    );
}

export default GroupMatchSection;