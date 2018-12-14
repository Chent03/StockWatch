import React, { Component } from 'react';
import {
    Container
} from 'reactstrap';
import Searchbar from '../../components/UI/Searchbar/Searchbar';

class Landing extends Component {
    render() {
        return(
            <Container>
                <Searchbar/>
            </Container>
        )
    }
}

export default Landing;