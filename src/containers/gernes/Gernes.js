import React, { Component, Fragment } from 'react'
import Cards from '../../components/common/Cards'
import axios from '../../axios'
import LoadMoreBtn from '../../components/common/LoadMoreBtn'
import Preloader from '../../components/common/Preloader'

class Gernes extends Component {
  state = {
    pathName: '',
    genres: [],
    paginatedGenres: [],
    isLoading: true
  }

  goToSinglePage = (routeParam) => {
    this.props.history.push(`/gernes/${routeParam}`)
  }
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
    const pathName = this.props.match.url.replace('/', '')
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
    }).catch(err => {
      console.log(err);
    }).finally(() => {
      this.setState({ isLoading: false })
    })
  }
  render() {
    const { genres, paginatedGenres, pathName, isLoading } = this.state
    return (
      <section className="platform-wrapper section-padding">
        <div className="container">
          {isLoading ? <Preloader /> :
            <Fragment>
              <div className="row">
                <div className="col-md-12">
                  <h1 className="text-white text-capitalize pb-5">{pathName}</h1>
                </div>
                {genres.map(genre => (
                  <div className="col-md-3 mb-4" key={genre.id}>
                    <Cards data={genre} goToSinglePage={this.goToSinglePage} />
                  </div>
                ))}
              </div>
              {paginatedGenres.length > 0 &&
                <div className="row">
                  <div className="col-md-4 mx-auto mt-3">
                    <LoadMoreBtn btnText={'Load More'} loadMore={this.loadMore} />
                  </div>
                </div>
              }
            </Fragment>
          }
        </div>
      </section>
    );
  }
}

export default Gernes;