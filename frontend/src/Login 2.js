import React, {Component} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import {withStyles} from "@material-ui/styles";
import PropTypes from "prop-types";

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
});

class Login2 extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { classes } = this.props;
        return (
            <div>
                <Container component="main" maxWidth="xs">
                    <CssBaseline />
                    <div className={classes.paper}>
                        <Avatar className={classes.avatar}>
                            <LockOutlinedIcon />
                        </Avatar>
                        <Typography component="h1" variant="h5">
                            Sign in
                        </Typography>
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
                            <FormControlLabel
                                control={<Checkbox value="remember" color="primary" />}
                                label="Remember me"
                            />
                            <Button
                                onClick={this.props.handleLogIn}
                                fullWidth
                                variant="contained"
                                color="primary"
                            >
                                Sign In
                            </Button>
                            <Grid container>
                                <Grid item xs>
                                    <Link onClick={this.props.switch}>
                                        Forgot password?
                                    </Link>
                                </Grid>
                                <Grid item>
                                    <p onClick={this.props.switch}>
                                        Don't have an account? Sign Up
                                    </p>
                                </Grid>
                            </Grid>
                        </form>
                    </div>
                    <p onClick={this.props.switch}>Drück mich!</p>
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

