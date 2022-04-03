import React, { Component, forwardRef } from 'react';
import { Table, Container, Button  } from 'reactstrap';
import MaterialTable from 'material-table'

import AddBox from '@material-ui/icons/AddBox';
import ArrowDownward from '@material-ui/icons/ArrowDownward';
import Check from '@material-ui/icons/Check';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Edit from '@material-ui/icons/Edit';
import FilterList from '@material-ui/icons/FilterList';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Remove from '@material-ui/icons/Remove';
import SaveAlt from '@material-ui/icons/SaveAlt';
import Search from '@material-ui/icons/Search';
import ViewColumn from '@material-ui/icons/ViewColumn';

const tableIcons = {
    Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
    Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
    Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
    DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
    Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
    Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
    FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
    LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
    NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
    ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
    SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
    ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
    ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />)
  };
export default class ListPlates extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            plates: [],
            plate:[],
            msg :'',
            isSuccess: false,
            isError: false
        }
    }

    async componentDidMount() {
        const response = await fetch('/plateList');
        const body = await response.json();
        this.setState({plates: body.data, isLoading: false, plate: {'id': 0, 'plate': 'M-PP123', 'owner': 'Max0', 'start_date': '2020-09-18T13:21:21Z' , 'end_date' : '2020-09-18T13:21:21Z'}});
    }

    render() {
        const title = <h3 style={{marginTop: '10px'}}>Plate List</h3>
        const {plates, isLoading} = this.state;
        if(isLoading)
            return (<div>Loading...</div>);

        return (
            <div>
                <div hidden={typeof(this.state.plates[0]) != 'undefined'}>
                    List is empty
                </div>
                <div hidden={typeof(this.state.plates) === 'undefined'}>
                    <Container>
                        
                        <MaterialTable
                            title={title}
                            icons={tableIcons}
                            columns={[
                                {field: 'owner', title: 'Owner', width: 95, align: 'center', type:'string'},
                                {field: 'plate', title: 'Plate', width: 95, align: 'center',type:'string'},
                                {field: 'start_date', title: 'Start date', width: 145, align: 'center',type:'date'},
                                {field: 'end_date', title: 'End date', width: 145, align: 'center',type:'date'}
                            ]}
                            data={this.state.plates}/>
                    </Container>
                    
                </div>
            </div>
        );
    }
}
