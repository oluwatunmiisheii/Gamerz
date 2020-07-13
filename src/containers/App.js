import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom'
import NavBar from '../components/common/Navigation'
import './App.scss';


// routes
import Homepage from './Home'
import NotFound from './NotFound'
import Platforms from './Platforms'
import Gernes from './Gernes'
import Developers from './Developers'
import Tags from './Tags'
import Single from './SingleGerne'

class App extends Component {
  render() {
    return (
      <React.Fragment>
        <NavBar />
        <Switch>
          <Route path="/tags" component={Tags}></Route>
          <Route path="/developers" component={Developers}></Route>
          <Route path="/gernes/:id" component={Single}></Route>
          <Route path="/gernes" component={Gernes}></Route>
          <Route path="/platforms" component={Platforms}></Route>
          <Route path="/not-found" component={NotFound}></Route>
          <Route path="/" exact component={Homepage} />
          <Redirect to="/not-found" />
        </Switch>
      </React.Fragment>
    )
  }
}

export default App;
