import React, { Component } from 'react'
import Cards from '../../components/common/Cards'
import axios from '../../axios'
import LoadMoreBtn from '../../components/common/LoadMoreBtn'
// import TransitionGroup from 'react-transition-group/TransitionGroup';
// import Fade from 'react-reveal/Fade';

class Developers extends Component {
  state = {
    pathName: '',
    developers: [],
    paginatedDevelopers: []
  }
  groupProps = {
    appear: false,
    enter: true,
    exit: true,
  };

  loadMore = () => {
    let paginatedDevelopers = [...this.state.paginatedDevelopers]
    let developers = [...this.state.developers]
    let poppedDevelopers,
      remainder;
    let chunk = 8
    if (paginatedDevelopers.length) {
      poppedDevelopers = paginatedDevelopers.slice(0, chunk);
      remainder = paginatedDevelopers.slice(chunk, chunk + paginatedDevelopers.length);
      developers = [...developers, ...poppedDevelopers]
      this.setState({ developers, paginatedDeveloper: remainder })
    }
  }

  componentDidMount() {
    const pathName = this.props.match.url.replace('/', '')
    this.setState({ pathName })
    axios.get('/developers').then(res => {
      const developers = res.data.results
      const chunk = 12
      if (developers.length > chunk) {
        const stateDevelopers = developers.slice(0, chunk);
        const paginatedDevelopers = developers.slice(chunk, chunk + developers.length);
        this.setState({ developers: stateDevelopers, paginatedDevelopers: paginatedDevelopers })
      }
      else {
        this.setState({ developers })
      }
    })
  }
  render() {
    const { developers, paginatedDevelopers } = this.state
    return (
      <section className="platform-wrapper section-padding">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <h1 className="text-white text-capitalize pb-5">{this.state.pathName}</h1>
            </div>
            {/* <div className="row"> */}
            {/* <TransitionGroup {...this.groupProps}> */}
            {developers.map(developer => (
              <div className="col-md-3 mb-4" key={developer.id}>
                <Cards data={developer} />
              </div>
            ))}
            {/* </TransitionGroup> */}
            {/* </div> */}
          </div>
          {paginatedDevelopers.length > 0 &&
            <div className="row">
              <div className="col-md-4 mx-auto mt-3">
                <LoadMoreBtn btnText={'Load More'} loadMore={this.loadMore} />
              </div>
            </div>
          }
        </div>
      </section>
    );
  }
}

export default Developers;