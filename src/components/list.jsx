import React, { Component } from 'react';
import request from 'superagent';
import Noms from './noms.jsx';

export default class List extends Component {
    constructor(props) {
        super(props);
        this.state = {
            users: [],
            message: [],
            page: null,
        }

        this.clickGet = this.clickGet.bind(this)
        this.clickPost = this.clickPost.bind(this)
    }

    componentWillMount() {
        request
            .post('http://localhost:3000/films')
            .end((err, res) => {
                const users = JSON.parse(res.text).results;
                this.setState({
                    users: users
                });
            });
    }

    clickGet(e) {
        request
            .get('http://localhost:3000/test')
            .end((err, res) => {
                const msg = JSON.parse(res.text).msg;
                this.setState({
                    message: msg
                });
            });
    }

    clickPost(e) { 
        request
            .post('http://localhost:3000/addFilm')
            .send({ nom: 'Manny11'}) // sends a JSON post body
            .end((err, res) => {
                err ? console.log(err) : console.log(res)
            });
            
        request
            .post('http://localhost:3000/films')
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
                <button onClick={this.clickGet}>Get</button>
                <button onClick={this.clickPost}>Post</button>
                <p>------</p>
                <Noms values={this.state.users}></Noms>
                <p>------</p>
                {this.state.message.toString()}
            </div>
        )
    }
}