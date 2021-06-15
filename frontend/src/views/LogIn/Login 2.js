import React, {Component} from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import {withStyles} from "@material-ui/styles";
import PropTypes from "prop-types";
import Logo from '../../Logo_LogIn.svg'
import '../../assets/theme.css';
import ButtonGoogleSignUp from "../../components/Button/ButtonGoogleSignUp";
import {Divider} from "@material-ui/core";


const styles = theme => ({
    paper: {
        marginTop: "theme.spacing(8)",
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: "theme.spacing(1)",
        backgroundColor: "theme.palette.secondary.main",
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: "theme.spacing(1)",
    },
    submit: {
        margin: "theme.spacing(3, 0, 2)",
    },
    img: {
        height: "69%",
        width: "69%"
    },
});

class Login2 extends Component {

    render() {
        const { classes } = this.props;
        return (
            <div>
                <Container component="main" maxWidth="xs">
                    <CssBaseline />
                    <div className={classes.paper}>
                        <img src={Logo} alt="Logo" className={classes.img}/>
                        <Typography component="h1" variant="h5">
                            LogIn
                        </Typography>
                        <p>{this.props.emailError}{this.props.passwordError}</p>
                        <form className={classes.form} noValidate>
                            <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                label="Email Address"
                                name="email"
                                autoComplete="email"
                                autoFocus
                                value = {this.props.email}
                                onChange={(e)=>this.props.setEmail(e.target.value)}
                            />
                            <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                                value = {this.props.password}
                                onChange={(e)=>this.props.setPassword(e.target.value)}
                            />
                            <Button
                                onClick={this.props.handleLogIn}
                                fullWidth
                                variant="contained"
                                color="primary"
                            >
                                Einloggen
                            </Button>
                            <Grid container>
                                <Grid item xs>
                                    <p style={{color:"blue",textDecoration:"underline"}}>
                                        Passwort vergessen?
                                    </p>
                                </Grid>
                                <Grid item>
                                    <p style={{color:"blue",textDecoration:"underline"}} onClick={this.props.switch}>
                                        Du hast keinen Account? Registrieren
                                    </p>
                                </Grid>
                            </Grid>
                        </form>
                        <p className="App">Oder</p>
                        <Divider/>
                        <ButtonGoogleSignUp init={this.props.init}/>
                    </div>
                </Container>
                {/*
                TODO Email Funktionen
                        <input type="text" autoComplete="on" autoFocus required
                        Noch aktuell?

                    />
                        <p className="errorMsg">{this.props.emailError}</p>

                        TODO Passwort Funktionen
                        <label>Password</label>
                        <input type="text" autoFocus required

                        <p className="errorMsg">{this.props.passwordError}</p>
                        <div className="btnContainer">
                */}
            </div>
        );
    }
}

Login2.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Login2);

