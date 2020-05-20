import React, { Component } from 'react';
import Location from './location/Locations/locations'
import AddAddress from './location/AddAddress/addAddress'
import Header from './location/Header/header'
import { BrowserRouter as Router, Route, Redirect, Switch } from "react-router-dom"

import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Router>
            <div className="card-header">
            <Header />
            </div>
              <Switch>
                <Route path='/' exact component={Location} />
                <Route path='/addAddress/:id' exact component={AddAddress} />
                <Route path='/addAddress' exact component={AddAddress} />
              </Switch>
              <Redirect to='/' />
            </Router>
      </div>
    );
  }
}

export default App;
