import React, {Component} from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import {withStyles} from "@material-ui/styles";
import PropTypes from "prop-types";
import Logo from '../../Logo_LogIn.svg'
import '../../assets/theme.css';
import Link from "@material-ui/core/Link";

const styles = theme  => ({
  paper: {
    margin: "auto",
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: "center",
    position: "relative",
  },
  avatar: {
    margin: "theme.spacing(1)",
    backgroundColor: "theme.palette.secondary.main",
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: "theme.spacing(3)",
    justifyContent: "center",
    alignItems: 'center',
  },
  submit: {
    marginTop: "10%",

  },
  body:{
    alignItems: 'center',
    justifyContent: "flex-start",
    display: "flex",
  },
  img: {
    height: "69%",
    width: "69%"
  },
});

class SignUp extends Component {

    render() {
        const { classes } = this.props;
        return (
            <div>
              <Container className={classes.body} component="main" maxWidth="xs">

      <div className={classes.paper}>
          <img src={Logo} alt="Logo" className={classes.img}/>
        <Typography component="h1" variant="h5" style={{marginBottom: "10%"}}>
          Erstellen Sie Ihr kostenloses Konto
        </Typography>
        <p>{this.props.emailError}{this.props.passwordError}</p>
        <form className={classes.form} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                value ={this.props.email}
                onChange={(e) => this.props.setEmail(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                  minlength="8"
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                value={this.props.password}
                onChange={(e) => this.props.setPassword(e.target.value)}
              />
            </Grid>
          </Grid>
          <Button
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={this.props.handleSignUp}
          >
            Anmelden
          </Button>
          <Grid container>
            <Grid item xs>
            </Grid>
            <Grid item>
              <p style={{color:"blue",textDecoration:"underline"}} onClick={this.props.switch}>
                Du hast einen Account? Einloggen
              </p>
            </Grid>
          </Grid>
        </form>
      </div>

    </Container>

            </div>
        );
    }
}
SignUp.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SignUp);

/////////////////////////////////////////////////



