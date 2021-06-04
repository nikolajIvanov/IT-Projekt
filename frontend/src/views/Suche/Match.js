import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/styles';
import SearchBar from "../../components/Textfeld/SearchBar";
import GroupPersonSwitch from "../../components/Icon/GroupPersonSwitch"
import FilterIcon from "../../components/Icon/FilterIcon";
import TeamUpApi from "../../api/TeamUpApi";
import ProfilListElement from "./Sections/ProfilListElement";

const styles = theme => ({
    root: {
        width: '100%',
        maxWidth: 360,
        margin: "auto",
    },
});

class Match extends Component {

    constructor(props) {
    super(props)
    this.state = {
        apiUsers: null,
        isPerson: true,
        apiGruppen: null
        }
    }

    getData = () => {
        TeamUpApi.getAPI().getAllUsers().then(users =>{
        this.setState({
            apiUsers: users
        });
    })
    }
    componentDidMount() {
        this.getData()
    }

    onClick = (e) => {
    this.setState(previousState => {
      return {
        isPerson: !previousState.isPerson
      }
    })
    }

    render(){
        const { classes } = this.props;
        const { apiUsers, isPerson }= this.state;
        return (
            <div className={classes.root}>
                {apiUsers ? <>
                    <GroupPersonSwitch/>
                    <SearchBar/>
                    <FilterIcon/>
                    <button onClick={this.onClick}>Klick mich</button>
                    { isPerson ?
                    <ProfilListElement apiUsers={apiUsers}/>
                    : console.log(isPerson)}
                </> : null }
            </div>
        );
    }
}

Match.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Match);
