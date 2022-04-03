import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export default class Home extends Component {
    render() {
        return (
            <div>
                <h4 style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                    Welcome to Peter Park coding challange
                </h4>
                <Link to="/addPlate">Add New Plate</Link>
                {"      "}
                <Link to="/listPlates">List Existing Plates</Link>

            </div>
        );
    }
}
