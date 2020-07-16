import React, { Component, Fragment } from 'react'
import Cards from '../../components/common/Cards'
import axios from '../../axios'
import LoadMoreBtn from '../../components/common/LoadMoreBtn'
import Preloader from '../../components/common/Preloader'

class Developers extends Component {
  state = {
    pathName: '',
    developers: [],
    paginatedDevelopers: [],
    isLoading: true
  }

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
        this.setState({ developers: stateDevelopers, paginatedDevelopers: paginatedDevelopers, isLoading: false })
      }
      else {
        this.setState({ developers })
      }
    }).catch(err => {
      console.log(err);
    }).finally(() => {
      this.setState({ isLoading: false })
    })
  }
  render() {
    const { developers, paginatedDevelopers, isLoading } = this.state
    return (
      <section className="platform-wrapper section-padding">
        <div className="container">
          {isLoading ? <Preloader /> :
            <Fragment>
              <div className="row">
                <div className="col-md-12">
                  <h1 className="text-white text-capitalize pb-5">{this.state.pathName}</h1>
                </div>
                {developers.map(developer => (
                  <div className="col-md-3 mb-4" key={developer.id}>
                    <Cards data={developer} />
                  </div>
                ))}
              </div>
              {paginatedDevelopers.length > 0 &&
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

export default Developers;