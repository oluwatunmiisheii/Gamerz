import React from 'react'
import './Banner.scss'
import Zoom from 'react-reveal/Zoom';

const Banner = () => {
  return (
    <section className="page-banner">
      <div className="container">
        <div className="row">
          <div className="col-md-6">
            <Zoom>
              <h1 className="text-white">Gamerzz</h1>
              <p className="text-grey">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Minus labore soluta molestias alias porro aliquam dicta ipsa recusandae commodi, maxime est pariatur corrupti unde voluptatem quaerat fugit distinctio quos magnam!</p>
            </Zoom>
          </div>
          <div className="col-md-6">

          </div>
        </div>
      </div>
    </section>
  )
}

export default Banner;