import React, { Component } from 'react';
import axios from 'axios';
import Noms from './noms.jsx';

export default class List extends Component {
    state = {
        values: []
    }

    componentWillMount() {
        update()
    }


    update(){
        axios.post('/listFilm')
        .then(res => {
            const values = res.data.results;
            this.setState({ values: values});
        })
    }


    render() {
        return (
            <div>

                <Noms values={this.state.users}></Noms>


            </div>
        )
    }
}