import React from 'react';

const Buttonn = ({ loadMore, btnText }) => {
  return (
    <div className="sim-button button28" onClick={loadMore}><span>{btnText}</span></div>
  );
}

export default Buttonn;