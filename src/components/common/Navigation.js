import React from 'react';
import { Link, NavLink } from 'react-router-dom'
import Input from '../common/Input'
import './Common.scss'
import Logo from '../../assets/images/appIcon.png'

const NavBar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark mb-0">
      <div className="container">
        <Link className="logo__container" to="/">
          <img src={Logo} alt="" height="30" width="30" />
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNavDropdown"
          aria-controls="navbarNavDropdown"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse d-flex justify-content-between" id="navbarNavDropdown">
          <div></div>
          <ul className="navbar-nav">
            <li className="nav-item">
              <NavLink className="nav-link" to="/platforms">
                Platforms
            </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/gernes">
                Gernes
            </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/developers">
                Developers
            </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/tags">
                Tags
            </NavLink>
            </li>
          </ul>
          <div className="d-flex justify-content-center align-items-center">
            <Input
              value=''
              name="username"
              type="text"
              label="username"
              id="username"
            />
            <button className="btn btn-primary my-2 my-sm-0 ml-2" type="submit">Search</button>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;