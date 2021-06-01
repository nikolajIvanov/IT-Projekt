import React from 'react';
import Grid from '@material-ui/core/Grid';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/styles';
import "../../assets/App.css"
import SectionAvatar from "./Sections/SectionAvatar";
import SectionSteckbrief from "./Sections/SectionSteckbrief";
import SectionLerntyp from "./Sections/SectionLerntyp";
import SectionLerngruppe from "./Sections/SectionLerngruppe";
import TeamUpApi from "../../api/TeamUpApi";
import firebase from 'firebase';
import ButtonBestätigen from "../../components/Button/ButtonBestätigen";
import User from "../../bo/User";

const styles = theme => ({
    root: {
        maxWidth: '100%',
        margin: "auto",
        overflow: "none"
    },
    test: {
        width: '20%'
    },
    grid: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
    }
});

class Profile extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            apiUser: false
        }
    }

    handleClick  = async () => {
        const user = new User()
        user.setAll(this.state.apiUser)
        console.log(user)
        //await TeamUpApi.getAPI().updateUser(firebase.auth().currentUser.uid, user.getAll())
    }

    setDate = (date) => {
        this.setState({
            apiUser:{
                geburtsdatum : date
            }
        });
    }

    setModul = (module) => {
        this.setState({
            apiUser: {
                module: [...this.state.apiUser.module, module]
            }
        })
        /*this.setState({
            apiUser: {
                module: [...this.state.apiUser.module, module]
            }
        });*/
    }


    /* async componentDidMount() {
        const user = await TeamUpApi.getAPI().getUser(firebase.auth().currentUser.uid)
        this.setState({
            user: user
        })
        console.log(this.state.user)
    } */

    async componentDidMount() {
        await TeamUpApi.getAPI().getUser(firebase.auth().currentUser.uid).then(user =>{
           this.setState({
            apiUser: user
        });
            })
        console.log(this.state.apiUser)
    }

    render(){
        const { classes } = this.props;
        const { apiUser}= this.state;

        return (
            <div className={classes.root}>
                { apiUser ?  <>
                <SectionAvatar img={apiUser.getProfilBild()} text={apiUser.getName()}/>
                <Grid container direction="column" justify="center" spacing={1} alignItems="center">
                    <Grid item xs={3}>
                        <SectionSteckbrief alter={apiUser.getGeburtstag()} module={apiUser.getModul()}
                                           dateChange={this.setDate} modulChange={this.setModul} text={"Steckbrief"} />
                    </Grid>
                    <Grid item xs={3}>
                        <SectionLerntyp lerntyp={apiUser.getLerntyp()} text={"Lerntyp"}/>
                    </Grid>
                    <Grid item xs={3}>
                        <SectionLerngruppe text={"Lerngruppen"}/>
                    </Grid>
                </Grid>
                <ButtonBestätigen inhalt={"Update"} onClick={this.handleClick}/>
                </> : null }
            </div>
        );
    }
}

Profile.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Profile);