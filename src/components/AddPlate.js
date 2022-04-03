import React, { Component } from 'react';
import { Container, Input, Button, Label, Form, FormGroup } from 'reactstrap';
import { Link } from 'react-router-dom';
import ErrorToast from "./toasts/ErrorToast";
import SuccessToast from "./toasts/SuccessToast";
import DatePicker from 'react-date-picker'
export default class AddPlate extends Component {

    emptyItem = {
        plate: '',
        owner: '',
        start_date: new Date(),
        end_date: new Date(),
    }

    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            item: this.emptyItem,
            msg: '',
            isSuccess: false,
            isError: false,
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleStartDateChange = this.handleStartDateChange.bind(this);
        this.handleEndDateChange = this.handleEndDateChange.bind(this);
    }

    async handleSubmit(event) {
        event.preventDefault();
        const item = this.state.item;
        const response = await fetch(`/addPlate`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(item)
        });
          
        if(response['status'] === 400 ) {
            this.setState({isError: true, isSuccess: false, msg: "Plate cannot be empty!"});
            setTimeout(() => this.setState({isError:false}),3000);
        }
        else if(response['status'] === 422 ) {
            this.setState({isError: true, isSuccess: false, msg: "Please enter a valid German plate"});
            setTimeout(() => this.setState({isError:false}),3000);
        }
        else if(response['status'] === 200) {
            this.setState({isSuccess: true, isError: false});
            setTimeout(() => this.setState({isSuccess:false}),3000);
            setTimeout(() => this.props.history.push('/'),3000);
        }
    }

    handleChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        let item = {...this.state.item};
        item[name] = value;
        this.setState({ item });
    }
    handleStartDateChange(date) {
        let item = {...this.state.item};
        item.start_date = date;
        this.setState({ item });
    }
    handleEndDateChange(date) {
        let item = {...this.state.item};
        item.end_date = date;
        this.setState({ item });
    }
    render() {
        const title = <h3>Add Plate</h3>
        return (
            <div>
                <div style={{"display": this.state.isSuccess || this.state.isError ? "block" : "none"}}>
                    <SuccessToast children={{show: this.state.isSuccess, message:"Plate successfully added into list!"}}/>

                    <ErrorToast children={{show: this.state.isError, message:this.state.msg}}/>
                </div>

                <div>
                    <Container>
                        {title}
                        
                        <Form onSubmit={this.handleSubmit}>
                            <FormGroup>
                                <Label for="plate">Plate</Label>
                                <Input type="text" name="plate" id="plate"
                                       onChange={this.handleChange} autoComplete="M-PP123" />
                            </FormGroup>

                            <FormGroup>
                                <Label for="owner">Owner</Label>
                                <Input type="text" name="owner" id="owner"
                                       onChange={this.handleChange} autoComplete="Owner" />
                            </FormGroup>
                            <FormGroup>
                                <Label for="event_date">Başlangıç Tarihi :  </Label>
                                <DatePicker onChange={this.handleStartDateChange} value={this.state.item.start_date} />
                            </FormGroup>

                            <FormGroup>
                                <Label for="event_end_date">Bitiş Tarihi : </Label>
                                <DatePicker onChange={this.handleEndDateChange} value={this.state.item.end_date} />
                            </FormGroup>
                            <FormGroup>
                                
                                <Button
                                    color="primary"
                                    type="submit"
                                >
                                    Submit
                                </Button>{' '}
                                <Button color="secondary" tag={Link} to="/">Go Back</Button>
                            </FormGroup>
                        </Form>
                    </Container>
                </div>
            </div>
        );
    }
}
