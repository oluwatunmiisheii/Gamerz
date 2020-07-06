import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom'
import NavBar from '../components/common/Navigation'
import './App.scss';
import axios from '../axios'

// routes
import Homepage from './Home'
import NotFound from './NotFound'
import Platforms from './Platforms'
import Gernes from './Gernes'
import Developers from './Developers'

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
          {/* <Route path="/movies" component={Movies}></Route> */}
          <Route path="/developers" component={Developers}></Route>
          <Route path="/gernes" component={Gernes}></Route>
          <Route path="not-found" component={NotFound}></Route>
          <Route path="/platforms" component={Platforms}></Route>
          <Route path="/" exact component={Homepage} />
          <Redirect to="/not-found" />
        </Switch>
      </React.Fragment>
    )
  }
}

export default App;
