import React from 'react';
import MobileStepper from '@material-ui/core/MobileStepper';
import Button from '@material-ui/core/Button';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import Grid from "@material-ui/core/Grid";
import {useHistory} from "react-router-dom";
import AddIcon from '@material-ui/icons/Add';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import H3_regular from "../../../components/Fonts/h3_regular";
import H1_bold from "../../../components/Fonts/h1_bold";
import MatchCardAvatar from "../../../components/Avatar/MatchCardAvatar";
import List from "@material-ui/core/List";
import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Collapse, Fade,
    ListItem,
    ListItemIcon,
    ListItemText
} from "@material-ui/core";
import H3_bold from "../../../components/Fonts/h3_bold";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Typography from "@material-ui/core/Typography";


function UserMatchSection(props) {
    const [activeStep, setActiveStep] = React.useState(0);
    const redirect = useHistory()
    const [open, setOpen] = React.useState(false)

    const handleYes = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
        props.getView(props.apiUsers[activeStep])
        redirect.push("/profil")
    };

    const handleNo = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    function openCard(){
        if(open === false) {
            setOpen(true)
        }
        else{
            setOpen(false)
        }
    }

    const user = props.apiUsers[activeStep]

    return (
        <div>
            <div className="matchingCards" onClick={openCard}>
                <div className="matchingCardFront">
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
                </div>
                <Fade in={open} style={{ transitionDelay: open ? '100ms' : '0ms' }} unmountOnExit>
                    <div className="matchingCardBack">
                        <List className="matchInfo">
                            <ListItem className="matchPoints">
                                <H3_bold inhalt={"Lernort"}/>
                                <ArrowRightIcon/>
                                <ListItemText primary={`${user.getLernort()}`}/>
                            </ListItem>
                            <ListItem>
                                <H3_bold inhalt={"Lernfrequenz"}/>
                                <ArrowRightIcon/>
                                <ListItemText primary={`${user.getFrequenz()}`}/>
                            </ListItem>
                            <ListItem>
                                <H3_bold inhalt={"Lernvorlieben"}/>
                                <ArrowRightIcon/>
                                <ListItemText primary={`${user.getLerntyp()}`}/>
                            </ListItem>
                        </List>
                    </div>
                </Fade>
            </div>
                <MobileStepper
                    position="static"
                    nextButton={
                        <Button size="small" onClick={handleYes} disabled={activeStep === props.apiUsers.length }>
                            Match
                            <KeyboardArrowRight />
                        </Button>
                    }
                    backButton={
                        <Button size="small" onClick={handleNo} disabled={activeStep === props.apiUsers.length -1}>
                            <KeyboardArrowLeft />
                            Weiter
                        </Button>
                    }
                />

        </div>
    );
};

export default UserMatchSection;