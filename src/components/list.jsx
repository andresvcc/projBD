import React, { Component } from 'react';
import axios from 'axios';
import Noms from './noms.jsx';

export default class List extends Component {
    
    state = {
        values: []
    }
    

    componentWillMount() {
        this.update()
    }


    update = ()=>{
        axios.post('/listFilm')
        .then(res => {
            const values = res.data.results;
            console.log(values)
            this.setState({ values: values});
        })
    }

    //

    render() {
        return (
            <div>

                
                <Noms values={this.state.values}></Noms>

            </div>
        )
    }
}