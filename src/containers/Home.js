import React, { Component } from 'react';
import Banner from '../components//homepage/Banner'
import axios from '../axios'

class Home extends Component {
  componentDidMount() {
    axios.get('/games').then(res => {
      console.log(res);
    })
  }
  render() {
    return (
      <Banner />
    )
  }
}

export default Home;