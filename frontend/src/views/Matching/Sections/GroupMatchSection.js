import React from 'react';
import MobileStepper from '@material-ui/core/MobileStepper';
import Button from '@material-ui/core/Button';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import Grid from "@material-ui/core/Grid";
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import MatchCardAvatar from "../../../components/Avatar/MatchCardAvatar";
import List from "@material-ui/core/List";
import {
    Collapse, Fade,
    ListItem,
    ListItemIcon,
    ListItemText, Modal, Paper
} from "@material-ui/core";
import FormatAlignJustifyIcon from "@material-ui/icons/FormatAlignJustify";
import {ExpandLess, ExpandMore} from "@material-ui/icons";
import ButtonPrimary from "../../../components/Button/ButtonPrimary";
import firebase from "../../../api/Firebase";
import TeamUpApi from "../../../api/TeamUpApi";
import H1_bold from "../../../components/Fonts/h1_bold";
import H3_regular from "../../../components/Fonts/h3_regular";
import H3_bold from "../../../components/Fonts/h3_bold";


function GroupMatchSection(props) {
    const [activeStep, setActiveStep] = React.useState(0);
    const [open, setOpen] = React.useState(false)
    const [modul, setModul] = React.useState(true)
    const[modal, setModal] = React.useState(false)

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

    function handleModul(){
        if(modul === true){
            setModul(false)
        }
        else{
            setModul(true)
        }
    }

    function match(){
        const grouparray = {
            authId: firebase.auth().currentUser.uid,
            angefragterId: group.getID()
        }
        TeamUpApi.getAPI().sendChatRequestGroup(grouparray).then(
            res => {
                if (res === 200) {
                    setModal(true)
                }
                else{
                    console.log("Anfrage Misslungen")
                }
            }
        )
    }

    function update() {
        props.setMatched()
    }

    const window = (
        <div className="card">
            <Paper className="card">
                <h1>🥳</h1>
                <h2Bold inhalt={"Anfrage erfolgreich versendet."}/>
                <ButtonPrimary inhalt={"home"} onClick={update}/>
            </Paper>
        </div>
    )

    const group = props.apiGroups[activeStep]

    return (
        <div>
            <div className="matchingCards" onClick={openCard}>
                <Modal open={modal}>{window}</Modal>
                <div>
                    <div className="matchHeader">
                        <Grid container spacing={3}>
                            <Grid className="matchProfilBox" item xs={12}>
                                <MatchCardAvatar img={group.getProfilBild()}/>
                            </Grid>
                            <Grid className="matchProfilBox" item xs={12}>
                                <H1_bold inhalt={`${group.getName()}`}/>
                                <H3_regular inhalt={group.getStudiengang()}/>
                            </Grid>
                        </Grid>
                    </div>
                </div>
                <Fade in={open} style={{ transitionDelay: open ? '100ms' : '0ms' }} unmountOnExit>
                    <div>
                        <List className="matchInfo">
                            <ListItem className="matchPoints">
                                <H3_bold inhalt={"Lernort"}/>
                                <ArrowRightIcon/>
                                <ListItemText primary={group.getLernort()}/>
                            </ListItem>
                            <ListItem>
                                <H3_bold inhalt={"Lernfrequenz"}/>
                                <ArrowRightIcon/>
                                <ListItemText primary={group.getFrequenz()}/>
                            </ListItem>
                            <ListItem>
                                <H3_bold inhalt={"Lernvorlieben"}/>
                                <ArrowRightIcon/>
                                <ListItemText primary={group.getLerntyp()}/>
                            </ListItem>
                            <ListItem className="matchPoints">
                                <H3_bold inhalt={"Studiengang"}/>
                                <ArrowRightIcon/>
                                <ListItemText primary={group.getStudiengang()}/>
                            </ListItem>
                            <ListItem className="matchPoints">
                                <H3_bold inhalt={"Lerntyp"}/>
                                <ArrowRightIcon/>
                                <ListItemText primary={group.getLerntyp()}/>
                            </ListItem>
                            <ListItem button onClick={handleModul}>
                                <ListItemIcon>
                                    <FormatAlignJustifyIcon />
                                </ListItemIcon>
                                <ListItemText primary="Module" />
                                {modul ? <ExpandLess /> : <ExpandMore />}
                            </ListItem>
                            <Collapse in={modul} timeout="auto" unmountOnExit>
                                <List component="div" disablePadding>
                                    {group.getModul().map(modul =>
                                        <ListItem>
                                            <ListItemText primary={modul}/>
                                        </ListItem>
                                    )}
                                </List>
                            </Collapse>
                        </List>
                    </div>
                </Fade>
            </div>
            <MobileStepper
                position="static"
                nextButton={
                    <Button size="small" onClick={match} disabled={activeStep === props.apiUsers.length }>
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

export default GroupMatchSection;