import React, { Component } from 'react'
import Cards from '../components/common/Cards'
import axios from '../axios'
import LoadMoreBtn from '../components/common/LoadMoreBtn'
// import TransitionGroup from 'react-transition-group/TransitionGroup';
// import Fade from 'react-reveal/Fade';

class Gernes extends Component {
  state = {
    pathName: '',
    genres: [],
    paginatedGenres: []
  }
  groupProps = {
    appear: false,
    enter: true,
    exit: true,
  };
  loadMore = () => {
    let paginatedGenres = [...this.state.paginatedGenres]
    let genres = [...this.state.genres]
    let poppedGenres,
      remainder;
    let chunk = 8
    if (paginatedGenres.length) {
      poppedGenres = paginatedGenres.slice(0, chunk);
      remainder = paginatedGenres.slice(chunk, chunk + paginatedGenres.length);
      genres = [...genres, ...poppedGenres]
      this.setState({ genres, paginatedGenres: remainder })
    }
  }
  componentDidMount() {
    const pathName = this.props.history.location.pathname.replace('/', '')
    this.setState({ pathName })
    axios.get('/genres').then(res => {
      const genres = res.data.results
      const chunk = 12
      if (genres.length > chunk) {
        const stateGenres = genres.slice(0, chunk);
        const paginatedGenres = genres.slice(chunk, chunk + genres.length);
        this.setState({ genres: stateGenres, paginatedGenres: paginatedGenres })
      }
      else {
        this.setState({ genres })
      }
    })
  }
  render() {
    const { genres, paginatedGenres } = this.state
    return (
      <section className="platform-wrapper section-padding">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <h1 className="text-white text-capitalize pb-5">{this.state.pathName}</h1>
            </div>
            {/* <div className="row"> */}
            {/* <TransitionGroup {...this.groupProps}> */}
            {genres.map(genre => (
              <div className="col-md-3 mb-4" key={genre.id}>
                <Cards data={genre} />
              </div>
            ))}
            {/* </TransitionGroup> */}
            {/* </div> */}
          </div>
          {paginatedGenres.length > 0 &&
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

export default Gernes;