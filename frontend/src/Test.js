import React, {Component} from 'react';

class Test extends Component {
    constructor(props) {
        super(props);

        this.state = {
            data: null,
        };
    }


    componentDidMount() {
        var requestOptions = {
            method: 'GET',
            redirect: 'follow'
        };

        fetch("http://127.0.0.1:5000/user", requestOptions)
            .then(response => response.json())
            /*.then(result => this.setState({
                    data: result.name
            }
            ))*/
            .then(result => console.log(result.name))
            .catch(error => console.log('error', error));
    }

    render() {
        return (
            <div>
                <h1>{this.state.data}</h1>
            </div>
        );
    }
}

export default Test;