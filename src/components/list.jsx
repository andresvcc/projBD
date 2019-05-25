import React, { Component } from 'react';
import request from 'superagent';
import Noms from './noms.jsx';

export default class List extends Component {
    constructor(props) {
        super(props);
        this.state = {
            users: []

        }
    }

    componentWillMount() {
        request
            .post('https://projbd.herokuapp.com/listFilm')
            .end((err, res) => {
                const users = JSON.parse(res.text).results;
                this.setState({
                    users: users
                });
            });
    }

    render() {
        return (
            <div>

                <Noms values={this.state.users}></Noms>


            </div>
        )
    }
}