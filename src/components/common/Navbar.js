import propTypes from 'prop-types'
import React, { useState, useEffect } from 'react'
import { Link, withRouter } from 'react-router-dom'
import { getUser, logout } from '../lib/auth'

import logo from '../../styles/images/Wordee_logo.svg'

const Navbar = ({
  location: { pathname },
  history,
  match: {
    params: { id }
  }
}) => {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    setOpen(false)
  }, [pathname])

  const handleLogout = () => {
    logout()
    history.push('/')
  }

  return (
    <nav className="navbar nav">
      <div className="container">
        <div className="navbar-brand">
          <img src={logo} alt={logo} className="navbar-logo" />
          <a
            href="#fill"
            role="button"
            onClick={() => setOpen(!open)}
            className={`navbar-burger burger ${open ? 'is-active' : ''}`}
            aria-label="menu"
            aria-expanded="false"
          >
            <span aria-hidden="true" className="coral"></span>
            <span aria-hidden="true" className="coral"></span>
            <span aria-hidden="true" className="coral"></span>
          </a>
        </div>
        <div className={`navbar-menu ${open ? 'is-active' : ''}`}>
          <div className="navbar-end">
            <Link
              className="navbar-item has-text-white"
              to={`/profile/${getUser()}`}
            >
              Profile
            </Link>
            <Link
              className="navbar-item has-text-white"
              to={`/createbrandbrief/${id}`}
            >
              Create Brief
            </Link>
            <a
              href="#fill"
              className="navbar-item has-text-white"
              onClick={handleLogout}
            >
              Logout
            </a>
          </div>
        </div>
      </div>
    </nav>
  )
}

Navbar.propTypes = {
  location: propTypes.shape({ pathname: propTypes.string }),
  history: propTypes.object,
  match: propTypes.shape({
    params: propTypes.shape({
      id: propTypes.string.isRequired
    })
  })
}
export default withRouter(Navbar)
