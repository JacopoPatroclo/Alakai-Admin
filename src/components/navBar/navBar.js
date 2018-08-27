import React from 'react'
import { Link } from 'react-router-dom'

const isSelected = (path) => {
  return window.location.pathname === path ? { fontWeight: 'bold' } : {}
}

const NavBar = (props) => (
  <nav className="navbar is-transparent">
    <div className="navbar-brand">
      <div className="navbar-item">
        <img src="https://bulma.io/images/bulma-logo.png" alt="Bulma: a modern CSS framework based on Flexbox" width="112" height="28"/>
      </div>
      <div className="navbar-burger burger" data-target="navbarExampleTransparentExample">
        <span></span>
        <span></span>
        <span></span>
      </div>
    </div>

    <div id="navbarExampleTransparentExample" className="navbar-menu">
      <div className="navbar-start">
        <Link className="navbar-item" style={isSelected('/')} to="/">Home</Link>
        <Link className="navbar-item" style={isSelected('/point')} to="/point">Create Point</Link>
        <Link className="navbar-item" style={isSelected('/path')} to="/path">Create Path</Link>
        <Link className="navbar-item" style={isSelected('/profile')} to="/profile">Profile and user managment</Link>
      </div>

      <div className="navbar-end">
        <div className="navbar-item">
          { props.isLoggedIn ? <a className="button is-danger" onClick={props.loggingOut}>LogOut</a> : ''}
        </div>
      </div>
    </div>
    </nav>
)

export default NavBar