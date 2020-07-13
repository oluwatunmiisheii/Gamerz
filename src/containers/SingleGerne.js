import React, { useState, useEffect } from 'react';
import ReactHtmlParser from 'react-html-parser';
import { Link } from 'react-router-dom'
import { useParams } from "react-router-dom";
import Logo from '../assets/images/appIcon.png'
import axios from '../axios'

const SingleGerne = () => {
  const [data, setData] = useState({ data: {} });
  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      const url = `/genres/${id}`
      try {
        const result = await axios(url);
        console.log(result.data);
        setData(result.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [id]);

  const description = data.description
  const bgImg = {
    backgroundImage: 'url(' + data['image_background'] + ')',
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    minHeight: '300px',
    height: '100%'
  };
  return (
    <section className="platform-wrapper section-padding">
      <div className='container'>
        <div className="row justify-content-end mb-5">
          <div className="col-md-12 offset-md-1 text-right">
            <Link to='/gernes' className="btn btn-outline-light badge-pill">Back</Link>
          </div>
        </div>
        <div className="row justify-content-between">
          <div className="col-md-5 order-2">
            <div style={bgImg} />
          </div>
          <div className="col-md-6 py-3">
            <h1 className="text-white text-capitalize pb-3">{data['name']}</h1>
            <div className="gerne-description">{ReactHtmlParser(description)}</div>
            <div className="border-bottom my-3"></div>
            <div className="d-flex align-items-center justify-content-between">
              <div className="d-flex align-items-center">
                <div className="icon-container">
                  <img src={Logo} alt="" height="30" width="30" />
                </div>
                <p className="pl-2 mb-0">Games Count</p>
              </div>
              <p className="mb-0">{data['games_count']}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default SingleGerne;

// export default Single;