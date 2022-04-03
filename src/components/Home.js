import React, { Component } from 'react';
import { Button } from 'reactstrap';
import { Link } from 'react-router-dom';

export default class Home extends Component {
    render() {
        return (
            <div>
                <h4 style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                    Welcome to Peter Park coding challange
                </h4>
                <Button color="primary" tag={Link} to="/addPlate">Add New Plate</Button>
                {"      "}
                <Button color="primary" tag={Link} to="/listPlates">List Existing Plates</Button>
            </div>
        );
    }
}
