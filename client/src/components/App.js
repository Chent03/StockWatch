import React, { Component } from 'react';
import { BrowserRouter, Route, Switch} from 'react-router-dom';

import Landing from '../pages/Landing/Landing';
import './App.scss';


class App extends Component {
    render() {
        return (
            <BrowserRouter>
                <Switch>
                    <Route exact path="/" component={Landing} />
                </Switch>
            </BrowserRouter>
        )
    }
}

export default App;