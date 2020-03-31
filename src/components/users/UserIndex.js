import React from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import Auth from '../../lib/auth'

class UserIndex extends React.Component {
  state = {
    users: [],
    skillFilter: ''
  }

  async getData() {
    try {
      const res = await axios.get('/api/chefs')
      let filteredUsers = []
      const skillFilter = localStorage.getItem('skill')
      if (skillFilter === 'ALL') {
        filteredUsers = [...res.data]
      } else {
        res.data.filter(user => {
          if (user.skills.includes(`${skillFilter}`) && user._id !== Auth.getUser()) {
            filteredUsers = [...filteredUsers, user]
          } return res.data
        })
      }
      this.setState({ users: filteredUsers, skillFilter })
    } catch (err) {
      console.log(err)
    }
  }

  componentDidMount() {
    this.getData()
  }

  componentDidUpdate() {
    const skillFilter = localStorage.getItem('skill')
    skillFilter !== this.state.skillFilter ? this.getData() : null
  }

  render() {
    return (
      <section className='hero is-fullheight-with-navbar'>
        <div className='hero-body-index'>
        </div>
        <h2 className='skill-header'>SKILL : <span>{localStorage.getItem('skill')}</span></h2>
        {this.state.users.map(user => (
          <Link to={`/chefs/${user._id}`} key={user._id}>
            <div className='box'>
              <article className='media'>
                <img src={user.image} alt={user.name} />
                <div className='info'>
                  <div className='bio'>
                    <h3 className='title'>{user.name}</h3>
                    {user.avgRating > 0 ?
                      <h3>{user.avgRating} <span className='star'>★</span></h3>
                      :
                      <h5>Not yet rated</h5>}
                    <h4>{user.city}</h4>
                  </div>
                  <div className='skills'>
                    {user.skills.map((skill, i) => <p key={i}>{skill}</p>)}
                  </div>
                </div>
              </article>
            </div>
          </Link>
        ))
        }
      </section>
    )
  }
}

export default UserIndex