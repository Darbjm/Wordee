import React from 'react'
import { Link, withRouter } from 'react-router-dom'
import Auth from '../../lib/auth'

class Navbar extends React.Component {
  state = {
    navbarOpen: false,
    searchResult: null,
    isActive: false
  }

  toggleNavBar = () => {
    this.setState({ navbarOpen: !this.state.navbarOpen })
  }

  handleClick = (e) => {
    localStorage.setItem('skill', e.target.innerHTML)
  }

  activeClick = () => {
    this.setState({ isActive: !this.state.isActive })
  }

  handleLogout = () => {
    Auth.logout()
    this.props.history.push('/')
  }

  componentDidUpdate(prevProps) {
    if (this.props.location.pathname !== prevProps.location.pathname) {
      this.setState({ navbarOpen: false })
    }
  }

  render() {
    const { navbarOpen, isActive } = this.state
    const menuVis = isActive ? 'is-active' : ''
    return (
      <nav className='navbar nav is-transparent is-fixed-top'>
        <div className='container'>
          <div className='navbar-brand'>
            <img src='../assets/ChowVow_white.svg' alt='logo' />
            <Link className='navbar-item' to='/'>
              <h1>Chow Vow</h1>
            </Link>
            <a role='button' onClick={this.activeClick} className={`navbar-burger burger ${menuVis}`} aria-label='menu' aria-expanded='false'>
              <span aria-hidden='true' className='white'></span>
              <span aria-hidden='true' className='white'></span>
              <span aria-hidden='true' className='white'></span>
            </a>
          </div>
          <div className={`navbar-menu ${menuVis}`}>
            <Link className='navbar-item has-text-white' to='/map/london'>MAP</Link>
            <div className='navbar-item has-dropdown is-hoverable'>
              <a className='navbar-link has-text-white is-arrowless' onClick={this.toggleNavBar}>CHEFS</a>
              {
                navbarOpen &&
              <div className='navbar-dropdown'>
                <Link className='navbar-item' to='/chefs' onClick={this.handleClick}>ALL</Link>
                <Link className='navbar-item' to='/chefs' onClick={this.handleClick}>African</Link>
                <Link className='navbar-item' to='/chefs' onClick={this.handleClick}>Caribbean</Link>
                <Link className='navbar-item' to='/chefs' onClick={this.handleClick}>Chinese</Link>
                <Link className='navbar-item' to='/chefs' onClick={this.handleClick}>French</Link>
                <Link className='navbar-item' to='/chefs' onClick={this.handleClick}>Greek</Link>
                <Link className='navbar-item' to='/chefs' onClick={this.handleClick}>Indian</Link>
                <Link className='navbar-item' to='/chefs' onClick={this.handleClick}>Italian</Link>
                <Link className='navbar-item' to='/chefs' onClick={this.handleClick}>Japanese</Link>
                <Link className='navbar-item' to='/chefs' onClick={this.handleClick}>Korean</Link>
                <Link className='navbar-item' to='/chefs' onClick={this.handleClick}>Mexican</Link>
                <Link className='navbar-item' to='/chefs' onClick={this.handleClick}>Moroccan</Link>
                <Link className='navbar-item' to='/chefs' onClick={this.handleClick}>South-East Asian</Link>
                <Link className='navbar-item' to='/chefs' onClick={this.handleClick}>Spanish</Link>
                <Link className='navbar-item' to='/chefs' onClick={this.handleClick}>Turkish/Middle-Eastern</Link>
                <Link className='navbar-item' to='/chefs' onClick={this.handleClick}>Vegan</Link>
                <Link className='navbar-item' to='/chefs' onClick={this.handleClick}>Vegetarian</Link>
              </div>
              }
            </div>
            <div className='navbar-end'>
              {!Auth.isAuthenticated() && <Link className='navbar-item has-text-white' to='/register'>SIGN UP</Link>}
              {!Auth.isAuthenticated() && <Link className='navbar-item has-text-white' to='/login'>LOGIN</Link>}
              {Auth.isAuthenticated() && <Link className='navbar-item has-text-white' to='/offers'>OFFERS</Link>}
              {Auth.isAuthenticated() && <Link className='navbar-item has-text-white' to='/profile'>PROFILE</Link>}
              {Auth.isAuthenticated() && <a className='navbar-item has-text-white' onClick={this.handleLogout}>LOGOUT</a>}
            </div>
          </div>
        </div>
      </nav>
    )
  }
}

export default withRouter(Navbar)



