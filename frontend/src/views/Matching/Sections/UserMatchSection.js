import React from 'react';
import MobileStepper from '@material-ui/core/MobileStepper';
import Button from '@material-ui/core/Button';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import Grid from "@material-ui/core/Grid";
import {useHistory} from "react-router-dom";
import H3_bold from "../../../components/Fonts/h3_bold";
import H3_regular from "../../../components/Fonts/h3_regular";
import H1_bold from "../../../components/Fonts/h1_bold";
import MatchCardAvatar from "../../../components/Avatar/MatchCardAvatar";


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
                <div className="matchHeader">
                    <Grid container spacing={3}>
                        <Grid className="matchProfilBox" item xs={12}>
                            <MatchCardAvatar img={user.getProfilBild()}/>
                        </Grid>
                    </Grid>
                    <div className="matchHeaderItem">
                        <H1_bold inhalt={`${user.getVorname()}, ${user.getGeburtstag()}`}/>
                        <H3_regular inhalt={user.getStudiengang()}/>
                    </div>
                </div>
            <div>
                <Grid container spacing={3}>
                        <Grid container className="matchBody">
                            <Grid item sx={12}>
                                <H3_bold inhalt={"Studiengang"}/>
                            </Grid>
                            <Grid item sx={12}>
                                <H3_regular inhalt={user.getStudiengang()}/>
                            </Grid>
                        </Grid>
                    </Grid>
                </div>
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
    );
};

export default UserMatchSection;