import React, { Component, Fragment } from 'react'
import Cards from '../../components/common/Cards'
import axios from '../../axios'
import LoadMoreBtn from '../../components/common/LoadMoreBtn'
import Preloader from '../../components/common/Preloader'

class Tags extends Component {
  state = {
    pathName: '',
    tags: [],
    paginatedTags: [],
    isLoading: true
  }
  groupProps = {
    appear: false,
    enter: true,
    exit: true,
  };

  loadMore = () => {
    let paginatedTags = [...this.state.paginatedTags]
    let tags = [...this.state.tags]
    let poppedTags,
      remainder;
    let chunk = 8
    if (paginatedTags.length) {
      poppedTags = paginatedTags.slice(0, chunk);
      remainder = paginatedTags.slice(chunk, chunk + paginatedTags.length);
      tags = [...tags, ...poppedTags]
      this.setState({ tags, paginatedTags: remainder })
    }
  }

  componentDidMount() {
    const pathName = this.props.match.url.replace('/', '')
    this.setState({ pathName })
    axios.get('/tags').then(res => {
      const tags = res.data.results
      const chunk = 12
      if (tags.length > chunk) {
        const stateTags = tags.slice(0, chunk);
        const paginatedTags = tags.slice(chunk, chunk + tags.length);
        this.setState({ tags: stateTags, paginatedTags: paginatedTags })
      }
      else {
        this.setState({ tags })
      }
    }).catch(err => {
      console.log(err);
    }).finally(() => {
      this.setState({ isLoading: false })
    })
  }
  render() {
    const { tags, paginatedTags, pathName, isLoading } = this.state
    return (
      <section className="platform-wrapper section-padding">
        <div className="container">
          {isLoading ? <Preloader /> :
            <Fragment>
              <div className="row">
                <div className="col-md-12">
                  <h1 className="text-white text-capitalize pb-5">{pathName}</h1>
                </div>
                {/* <div className="row"> */}
                {/* <TransitionGroup {...this.groupProps}> */}
                {tags.map(tag => (
                  <div className="col-md-3 mb-4" key={tag.id}>
                    <Cards data={tag} />
                  </div>
                ))}
                {/* </TransitionGroup> */}
                {/* </div> */}
              </div>
              {paginatedTags.length > 0 &&
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

export default Tags;