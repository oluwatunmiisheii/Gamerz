import React, { Component } from 'react'
import Cards from '../components/common/Cards'
import axios from '../axios'
import LoadMoreBtn from '../components/common/LoadMoreBtn'
// import TransitionGroup from 'react-transition-group/TransitionGroup';
// import Fade from 'react-reveal/Fade';

class Platfornms extends Component {
  state = {
    pathName: '',
    platforms: [],
    paginatedPlatforms: []
  }
  groupProps = {
    appear: false,
    enter: true,
    exit: true,
  };
  loadMore = () => {
    let paginatedPlatforms = [...this.state.paginatedPlatforms]
    let platforms = [...this.state.platforms]
    let poppedPlatforms,
      remainder;
    let chunk = 8
    if (paginatedPlatforms.length) {
      poppedPlatforms = paginatedPlatforms.slice(0, chunk);
      remainder = paginatedPlatforms.slice(chunk, chunk + paginatedPlatforms.length);
      platforms = [...platforms, ...poppedPlatforms]
      this.setState({ platforms, paginatedPlatforms: remainder })
    }
  }

  componentDidMount() {
    const pathName = this.props.history.location.pathname.replace('/', '')
    this.setState({ pathName })
    axios.get('/platforms').then(res => {
      const platforms = res.data.results
      const chunk = 12
      if (platforms.length > chunk) {
        const statePlatforms = platforms.slice(0, chunk);
        const paginatedPlatforms = platforms.slice(chunk, chunk + platforms.length);
        this.setState({ platforms: statePlatforms, paginatedPlatforms: paginatedPlatforms })
      }
    })
  }
  render() {
    const { platforms, paginatedPlatforms } = this.state
    return (
      <section className="platform-wrapper section-padding">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <h1 className="text-white text-capitalize pb-5">{this.state.pathName}</h1>
            </div>
            {/* <div className="row"> */}
            {/* <TransitionGroup {...this.groupProps}> */}
            {platforms.map(platform => (
              <div className="col-md-3 mb-4" key={platform.id}>
                <Cards data={platform} />
              </div>
            ))}
            {/* </TransitionGroup> */}
            {/* </div> */}
          </div>
          {paginatedPlatforms.length > 0 &&
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

export default Platfornms;