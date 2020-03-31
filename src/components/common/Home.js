import React from 'react'
import { Link } from 'react-router-dom'

class Home extends React.Component {
  state = {
    search: '',
    width: 0,
    height: 0
  }

  constructor(props) {
    super(props)
    this.state = { width: 0, height: 0 }
    this.updateWindowDimensions = this.updateWindowDimensions.bind(this)
  }
  
  componentDidMount() {
    this.updateWindowDimensions()
    window.addEventListener('resize', this.updateWindowDimensions)
  }
  
  componentWillUnmount() {
    window.removeEventListener('resize', this.updateWindowDimensions)
  }
  
  updateWindowDimensions() {
    this.setState({ width: window.innerWidth, height: window.innerHeight })
  }

  handleChange = e => {
    this.setState({ search: e.target.value })
  }

  handleSubmit = e => {
    e.preventDefault()
    this.props.history.push(`/map/${this.state.search}`)
  }

  handleClick = (e) => {
    console.log(e.target.id)
    localStorage.setItem('skill', e.target.id)
  }

  render() {
    const { width } = this.state
    return (
      <>
        <div className="hero-body">
          <form onSubmit={this.handleSubmit} className="search-bar">
            <div className="search">
              <input type="text" className="search-text" placeholder={width > 674 ? 'Choose an area' : 'Area'} onChange={this.handleChange} />
              <button type="submit" className="search-button">
                <img src="../../assets/search.png" />
              </button>
            </div>
          </form>
          <a href="#skills" className="arrow"><img src="../../assets/arrow.png" /></a>
        </div>
        <section className='image-section'>
          <div className="wrapper" id="skills">
            <div className="columns is-mobile is-multiline">
              <div className="skill column is-one-quarter-desktop is-half-tablet is-full-mobile">
                <Link onClick={this.handleClick} to="/chefs" className='african'>
                  <div alt="African" id="African" >
                    <div className='layer' id="African" >
                      <h2 id="African" >African</h2>
                    </div>
                  </div>
                </Link>
              </div>
              <div className="skill column is-one-quarter-desktop is-half-tablet is-full-mobile">
                <Link onClick={this.handleClick} to="/chefs" className='carribean'>
                  <div className='layer' id="Caribbean" >
                    <h2 id="Caribbean" >Caribbean</h2>
                  </div>
                </Link>
              </div>
              <div className="skill column is-one-quarter-desktop is-half-tablet is-full-mobile">
                <Link onClick={this.handleClick} to="/chefs" className='chinese'>
                  <div className='layer' id="Chinese" >
                    <h2 id="Chinese" >Chinese</h2>
                  </div>
                </Link>
              </div>
              <div className="skill column is-one-quarter-desktop is-half-tablet is-full-mobile">
                <Link onClick={this.handleClick} to="/chefs" className='french'>
                  <div className='layer' id="French" >
                    <h2 id="French" >French</h2>
                  </div>
                </Link>
              </div>
              <div className="skill column is-one-quarter-desktop is-half-tablet is-full-mobile">
                <Link onClick={this.handleClick} to="/chefs" className='greek'>
                  <div className='layer' id="Greek" >
                    <h2 id="Greek" >Greek</h2>
                  </div>
                </Link>
              </div>
              <div className="skill column is-one-quarter-desktop is-half-tablet is-full-mobile">
                <Link onClick={this.handleClick} to="/chefs" className='indian'>
                  <div className='layer' id="Indian" >
                    <h2 id="Indian" >Indian</h2>
                  </div>
                </Link>
              </div>
              <div className="skill column is-one-quarter-desktop is-half-tablet is-full-mobile">
                <Link onClick={this.handleClick} to="/chefs" className='italian'>
                  <div className='layer' id="Italian" >
                    <h2 id="Italian" >Italian</h2>
                  </div>
                </Link>
              </div>
              <div className="skill column is-one-quarter-desktop is-half-tablet is-full-mobile">
                <Link onClick={this.handleClick} to="/chefs" className='japanese'>
                  <div className='layer' id="Japanese" >
                    <h2 id="Japanese" >Japanese</h2>
                  </div>
                </Link>
              </div>
              <div className="skill column is-one-quarter-desktop is-half-tablet is-full-mobile">
                <Link onClick={this.handleClick} to="/chefs" className='korean'>
                  <div className='layer' id="Korean" >
                    <h2 id="Korean" >Korean</h2>
                  </div>
                </Link>
              </div>
              <div className="skill column is-one-quarter-desktop is-half-tablet is-full-mobile">
                <Link onClick={this.handleClick} to="/chefs" className='mexican'>
                  <div className='layer' id="Mexican" >
                    <h2 id="Mexican" >Mexican</h2>
                  </div>
                </Link>
              </div>
              <div className="skill column is-one-quarter-desktop is-half-tablet is-full-mobile">
                <Link onClick={this.handleClick} to="/chefs" className='moroccan'>
                  <div className='layer' id="Moroccan" >
                    <h2 id="Moroccan" >Moroccan</h2>
                  </div>
                </Link>
              </div>
              <div className="skill column is-one-quarter-desktop is-half-tablet is-full-mobile">
                <Link onClick={this.handleClick} to="/chefs" className='asian'>
                  <div className='layer' id="South-East Asian" >
                    <h2 id="South-East Asian" >South-East Asian</h2>
                  </div>
                </Link>
              </div>
              <div className="skill column is-one-quarter-desktop is-half-tablet is-full-mobile">
                <Link onClick={this.handleClick} to="/chefs" className='spanish'>
                  <div className='layer' id="Spanish" >
                    <h2 id="Spanish" >Spanish</h2>
                  </div>
                </Link>
              </div>
              <div className="skill column is-one-quarter-desktop is-half-tablet is-full-mobile">
                <Link onClick={this.handleClick} to="/chefs" className='turkish'>
                  <div className='layer' id="Turkish/Middle-Eastern" >
                    <h2 id="Turkish/Middle-Eastern" >Turkish <br /> Middle-Eastern</h2>
                  </div>  
                </Link>
              </div>
              <div className="skill column is-one-quarter-desktop is-half-tablet is-full-mobile">
                <Link onClick={this.handleClick} to="/chefs" className='vegan'>
                  <div className='layer' id="Vegan" >
                    <h2 id="Vegan" >Vegan</h2>
                  </div>  
                </Link>
              </div>
              <div className="skill column is-one-quarter-desktop is-half-tablet is-full-mobile">
                <Link onClick={this.handleClick} to="/chefs" className='vegetarian'>
                  <div className='layer' id="Vegetarian" >
                    <h2 id="Vegetarian" >Vegetarian</h2>
                  </div>
                </Link>
              </div>
            </div >
          </div >
        </section >
      </>
    )
  }
}

export default Home