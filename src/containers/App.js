import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom'
import NavBar from '../components/common/Navigation'
import Homepage from './Home'
import NotFound from './NotFound'
import './App.scss';
import axios from '../axios'

class App extends Component {

  componentDidMount() {
    axios.get('/games').then(res => {
      console.log(res);
    })
  }
  render() {
    return (
      <React.Fragment>
        <NavBar />
        <Switch>
          {/* <Route path="/movies" component={Movies}></Route>
          <Route path="/login" component={LoginForm}></Route>
          <Route path="/customers" component={Customers}></Route>
          <Route path="/rentals" component={Rentals}></Route> */}
          <Route path="not-found" component={NotFound}></Route>
          <Route path="/" exact component={Homepage} />
          <Redirect to="/not-found" />
        </Switch>
      </React.Fragment>
    )
  }
}

export default App;
