import React from 'react';

const PreLoader = () => {
  return (
    <div className="container">
      <div className="row">
        <div className="col-12">
          <div className="spinner">
            <div className="cube1"></div>
            <div className="cube2"></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PreLoader;