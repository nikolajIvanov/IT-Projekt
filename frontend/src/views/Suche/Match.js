import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/styles';
import SearchBar from "../../components/Textfeld/SearchBar";
import GroupPersonSwitch from "../../components/Icon/GroupPersonSwitch"
import FilterIcon from "../../components/Icon/FilterIcon";
import TeamUpApi from "../../api/TeamUpApi";
import ProfilListElement from "./Sections/ProfilListElement";
import GroupListElement from "./Sections/GroupListElement";
import ButtonPrimary from "../../components/Button/ButtonPrimary";

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
            apiUsers: null, // Speichert alle User Daten aus dem Backend
            isPerson: true, // Wird für den Switch von Person auf Gruppe und umgekehrt genutzt
            apiGruppen: null, // Speichert alle Gruppen Daten aus dem Backend
        }
    }

    // Ladet direkt die User Daten aus dem Backend
    componentDidMount() {
        this.setState({
            apiUsers: this.props.userList,
            apiGruppen: this.props.groupList
        });
    }
    // Setzt den Wert für
    handleClick = () => {
        this.setState(previousState => {
          return {
            isPerson: !previousState.isPerson
          };
        });
    }

    render(){
        const { classes } = this.props;
        const { apiUsers, isPerson, apiGruppen, selectedUser }= this.state;

        return (
            <div className={classes.root}>
                <GroupPersonSwitch onClick={this.handleClick} value={isPerson}/>
                {apiUsers ? <>
                    <FilterIcon/>
                    { isPerson ?
                        <>
                            <ProfilListElement
                                getView={this.props.getView}
                                apiUsers={apiUsers}/>
                        </>
                    :
                        <>
                            <GroupListElement apiGruppe={apiGruppen}/>
                            <ButtonPrimary inhalt={"Gruppe anzeigen"}/>
                        </>
                            }
                </> : null }
            </div>
        );
    };
}

Match.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Match);
