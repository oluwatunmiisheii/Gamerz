import React from 'react';
import './Common.scss'
import { Link } from 'react-router-dom'

const Cards = ({ data, goToSinglePage }) => {
  const games = data.games.slice(0, 4)
  return (
    <div className="card bg-dark text-white card-translate">
      <img src={data['image_background']} alt={data['name']} className="card-img" />
      <div className="card-img-overlay d-flex justify-content-center flex-column">
        <h4 className="card-title mb-4 pointer" onClick={() => goToSinglePage(data.id)}>{data['name']}</h4>
        <ul className="list-group list-group-flush bg-transparent text-white">
          {games.map(game => (
            <li className="list-group-item d-flex align-items-center justify-content-between border-0 py-1" key={game.id}>
              <span className="list-link"><Link to="/tags">{game['name']}</Link></span>
              <span className="list-right text-muted">{game['added']}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Cards;