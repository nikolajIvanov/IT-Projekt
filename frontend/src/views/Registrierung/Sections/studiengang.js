import React from 'react';
import {Paper, Typography} from "@material-ui/core";
import theme from "../../../theme";
import DropDown from "../../../components/Textfeld/Dropdown";
import TeamUpApi from "../../../api/TeamUpApi";
import {Skeleton} from "@material-ui/lab";

export default class Studiengang extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            studiengang : null,
        }
    }

    handleSemester = (event) => {
        this.props.setStudiengang(event.target.value);
        this.props.setModul([])
    };

    componentDidMount = async() => {
        await TeamUpApi.getAPI().getStudiengang()
            .then((studiengang) => {
                const middle = []
                studiengang.forEach(i => {
                    middle.push({
                        key: i.getID(),
                        value: i.getStudiengang()
                    })
                })
                return middle
            })
            .then((res) => {
                setTimeout(() => this.setState({
                        studiengang : res
                    }), 3000)

                console.log(this.state.studiengang)
            }
        );
    }

    render() {
        const {studiengang} = this.state
        return (
            <Paper style={this.props.mode}>
                <Typography style={theme.font.register}>Was studierst du?</Typography>
                {studiengang ? <>
                    <DropDown
                        handleChange={this.handleSemester}
                        input={this.props.studium}
                        map={studiengang}
                        droplabel={this.props.drop}
                    />
                </>: <Skeleton>
                    <DropDown map={[]}/>
                        </Skeleton>
                }
            </Paper>
        );
    };
}