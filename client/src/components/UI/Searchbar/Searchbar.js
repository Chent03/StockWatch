import React, { Component } from 'react';
import { connect } from 'react-redux';

import { fetchStocks } from '../../../store/actions';

import {
    Button,
    Form,
    FormGroup,
    Input
} from 'reactstrap';

import './Searchbar.scss';

class Searchbar extends Component {
    constructor(props) {
        super(props);
        this.state = { symbol: '' };
    }

    handleChange = (event) => {
        this.setState({symbol: event.target.value});
    }

    handleSubmit = (event) => {
        event.preventDefault();
        this.props.fetchStocks(this.state.symbol);
    }

    render() {
        console.log(this.props.history);
        return(
            <Form onSubmit={this.handleSubmit}>
                <FormGroup>
                    <Input 
                        value={this.state.symbol}
                        onChange={this.handleChange}
                        type="text" 
                        name="symbol" 
                        placeholder="Stock Symbol"
                    />
                </FormGroup>
                <Button type="submit" color="primary">Submit</Button>
            </Form>
            
        )
    }
}


export default connect(null, {fetchStocks})(Searchbar);