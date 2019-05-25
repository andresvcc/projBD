import React, { Component } from 'react';

export default class Noms extends Component {
    render(){
        var values = this.props.values.map((user, i) => {
            return <li key={i}>id:{user.id_film} - {user.film_nom}</li>
        })
        return (
            <div>
                <lu>
                    {values}
                </lu>
            </div>
        )
    }
}