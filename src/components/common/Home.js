import React from 'react'
import { Link } from 'react-router-dom'

class Home extends React.Component {
  state = {
    search: ''
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
    return (
      <>
        <div className="hero-body">
          <form onSubmit={this.handleSubmit} className="search-bar">
            <div className="search">
              <input type="text" className="search-text" placeholder="Choose an area" onChange={this.handleChange} />
              <button type="submit" className="search-button">
                <img src="../../assets/search.png" />
              </button>
            </div>
          </form>
          <a href="#skills" className="arrow"><img src="../../assets/arrow.png" /></a>
        </div>
        <section>
          <div className="wrapper" id="skills">
            <div className="columns is-mobile is-multiline">
              <div className="skill column is-one-quarter-desktop is-half-tablet is-full-mobile">
                <Link onClick={this.handleClick} to="/chefs">
                  <img src="../../assets/african.jpeg" alt="African" id="African" />
                  <div className="border" id="African">
                    <h2 id="African">African</h2>
                  </div>
                </Link>
              </div>
              <div className="skill column is-one-quarter-desktop is-half-tablet is-full-mobile">
                <Link onClick={this.handleClick} to="/chefs">
                  <img src="../../assets/caribbean.jpeg" alt="Caribbean" id="Caribbean"/>
                  <div className="border" id="Caribbean">
                    <h2 id="Caribbean">Caribbean</h2>
                  </div>
                </Link>
              </div>
              <div className="skill column is-one-quarter-desktop is-half-tablet is-full-mobile">
                <Link onClick={this.handleClick} to="/chefs">
                  <img src="../../assets/chinese.jpeg" alt="Chinese" id="Chinese"/>
                  <div className="border" id="Chinese">
                    <h2 id="Chinese">Chinese</h2>
                  </div>
                </Link>
              </div>
              <div className="skill column is-one-quarter-desktop is-half-tablet is-full-mobile">
                <Link onClick={this.handleClick} to="/chefs">
                  <img src="../../assets/french.jpeg" alt="French" id="French"/>
                  <div className="border" id="French">
                    <h2 id="French">French</h2>
                  </div>
                </Link>
              </div>
              <div className="skill column is-one-quarter-desktop is-half-tablet is-full-mobile">
                <Link onClick={this.handleClick} to="/chefs">
                  <img src="../../assets/greek.jpeg" alt="Greek" id="Greek"/>
                  <div className="border" id="Greek">
                    <h2 id="Greek">Greek</h2>
                  </div>
                </Link>
              </div>
              <div className="skill column is-one-quarter-desktop is-half-tablet is-full-mobile">
                <Link onClick={this.handleClick} to="/chefs">
                  <img src="../../assets/indian.jpeg" alt="Indian" id="Indian"/>
                  <div className="border" id="Indian">
                    <h2 id="Indian">Indian</h2>
                  </div>
                </Link>
              </div>
              <div className="skill column is-one-quarter-desktop is-half-tablet is-full-mobile">
                <Link onClick={this.handleClick} to="/chefs">
                  <img src="../../assets/italian.jpeg" alt="Italian" id="Italian"/>
                  <div className="border" id="Italian">
                    <h2 id="Italian">Italian</h2>
                  </div>
                </Link>
              </div>
              <div className="skill column is-one-quarter-desktop is-half-tablet is-full-mobile">
                <Link onClick={this.handleClick} to="/chefs">
                  <img src="../../assets/japanese.jpeg" alt="Japanese" id="Japanese"/>
                  <div className="border" id="Japanese">
                    <h2 id="Japanese">Japanese</h2>
                  </div>
                </Link>
              </div>
              <div className="skill column is-one-quarter-desktop is-half-tablet is-full-mobile">
                <Link onClick={this.handleClick} to="/chefs">
                  <img src="../../assets/korean.jpeg" alt="Korean" id="Korean"/>
                  <div className="border" id="Korean">
                    <h2 id="Korean">Korean</h2>
                  </div>
                </Link>
              </div>
              <div className="skill column is-one-quarter-desktop is-half-tablet is-full-mobile">
                <Link onClick={this.handleClick} to="/chefs">
                  <img src="../../assets/mexican.jpg" alt="Mexican" id="Mexican"/>
                  <div className="border" id="Mexican">
                    <h2 id="Mexican">Mexican</h2>
                  </div>
                </Link>
              </div>
              <div className="skill column is-one-quarter-desktop is-half-tablet is-full-mobile">
                <Link onClick={this.handleClick} to="/chefs">
                  <img src="../../assets/moroccan.jpeg" alt="Moroccan" id="Moroccan" />
                  <div className="border" id="Moroccan">
                    <h2 id="Moroccan">Moroccan</h2>
                  </div>
                </Link>
              </div>
              <div className="skill column is-one-quarter-desktop is-half-tablet is-full-mobile">
                <Link onClick={this.handleClick} to="/chefs">
                  <img src="../../assets/asian.jpeg" alt="South-East Asian" id="South-East Asian"/>
                  <div className="border" id="South-East Asian">
                    <h2 id="South-East Asian">South-East Asian</h2>
                  </div>
                </Link>
              </div>
              <div className="skill column is-one-quarter-desktop is-half-tablet is-full-mobile">
                <Link onClick={this.handleClick} to="/chefs">
                  <img src="../../assets/spanish.jpg" alt="Spanish" id="Spanish"/>
                  <div className="border" id="Spanish">
                    <h2 id="Spanish">Spanish</h2>
                  </div>
                </Link>
              </div>
              <div className="skill column is-one-quarter-desktop is-half-tablet is-full-mobile">
                <Link onClick={this.handleClick} to="/chefs">
                  <img src="../../assets/turkish.jpg" alt="Turkish/Middle-Eastern" id="Turkish/Middle-Eastern"/>
                  <div className="border" id="Turkish/Middle-Eastern">
                    <h2 id="Turkish/Middle-Eastern">Turkish/Middle-Eastern</h2>
                  </div>
                </Link>
              </div>
              <div className="skill column is-one-quarter-desktop is-half-tablet is-full-mobile">
                <Link onClick={this.handleClick} to="/chefs">
                  <img src="../../assets/vegan.jpeg" alt="Vegan" id="Vegan" />
                  <div className="border" id="Vegan">
                    <h2 id="Vegan">Vegan</h2>
                  </div>
                </Link>
              </div>
              <div className="skill column is-one-quarter-desktop is-half-tablet is-full-mobile">
                <Link onClick={this.handleClick} to="/chefs">
                  <img src="../../assets/vegetarian.jpg" alt="Vegetarian" id="Vegetarian"/>
                  <div className="border" id="Vegetarian">
                    <h2 id="Vegetarian">Vegetarian</h2>
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