import React, {Component} from 'react';

class GetUser extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: null,
            //id später übergeben lassen
            id: 0,
        };
    }

//Beim starten der Componente wird die API Schnittstelle aufgerufen
    componentDidMount() {
        var requestOptions = {
            method: 'GET',
            redirect: 'follow'
        };

//Die API Schnittstelle
        fetch("http://127.0.0.1:5000/user/" + this.state.id, requestOptions)
            .then(response => response.json())
            .then(result => this.setState({
                    name: result.name
            }
            ))
            //Falls ein fehler auftritt wird in der Konsole ein error angezeigt
            .catch(error => console.log('error', error));
    }

//Die Komponente rendert ein H1 Tag mit dem Namen von der API
    render() {
        return (
            <div>
                <h1>{this.state.name}</h1>
            </div>
        );
    }
}

export default GetUser;