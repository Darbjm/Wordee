import React from 'react'
import axios from 'axios'
import Auth from '../../lib/auth'
class Offers extends React.Component {
  state = {
    offersPending: [],
    offersAccepted: []
  }
  getOffers = user => {
    return (axios.get(`/api/chefs/${user.offeringUser}`, {
      headers: { Authorization: `Bearer ${Auth.getToken()}` }
    }))
  }
  getAccepted = user => {
    console.log(user)
    return (axios.get(`/api/chefs/${user.acceptedUser}`, {
      headers: { Authorization: `Bearer ${Auth.getToken()}` }
    }))
  }
  findOffers = async user => {
    Promise.all(user.data.offersPending.map(info => {
      return this.getOffers(info)
    }))
      .then(user => {
        this.setState({ offersPending: user })
      })
    Promise.all(user.data.offersAccepted.map(info => {
      return this.getAccepted(info)
    }))
      .then(user => {
        this.setState({ offersAccepted: user })
      })
  }
  async componentDidMount() {
    try {
      const user = await axios.get('/api/offers', {
        headers: { Authorization: `Bearer ${Auth.getToken()}` }
      })
      await this.findOffers(user)
    } catch (err) {
      console.log(err)
    }
  }
  handleDelete = async offerery => {
    try {
      await axios.delete(`/api/chefs/${Auth.getUser()}/offersPending/${offerery._id}`, {
        headers: { Authorization: `Bearer ${Auth.getToken()}` }
      })
    } catch (err) {
      console.log(err.response)
    } finally {
      const user = await axios.get('/api/offers', {
        headers: { Authorization: `Bearer ${Auth.getToken()}` }
      })
      await this.findOffers(user)
    }
  }
  handleDeleteAccepted = async offerery => {
    try {
      await axios.delete(`/api/chefs/${Auth.getUser()}/offersAccepted/${offerery.data._id}`, {
        headers: { Authorization: `Bearer ${Auth.getToken()}` }
      })
    } catch (err) {
      console.log(err.response)
    } finally {
      const user = await axios.get('/api/offers', {
        headers: { Authorization: `Bearer ${Auth.getToken()}` }
      })
      await this.findOffers(user)
    }
  }
  handleAccept = async offerery => {
    this.handleDelete(offerery)
    try {
      await axios.post(`/api/chefs/${Auth.getUser()}/offersAccepted`, offerery, {
        headers: { Authorization: `Bearer ${Auth.getToken()}` }
      })
    } catch (err) {
      console.log(err.response)
    } finally {
      const user = await axios.get('/api/offers', {
        headers: { Authorization: `Bearer ${Auth.getToken()}` }
      })
      await this.findOffers(user)
    }
  }
  render() {
    const { offersPending, offersAccepted } = this.state
    return (
      <section className='hero is-fullheight-with-navbar'>
        <div className='hero-body-offers'>
        </div>
        <h2 className='offers'>My Offers</h2>
        <h2 className='pending'>Pending:</h2>
        {offersPending.length ? offersPending.map((user, i) => {
          return <div key={i} className='box'>
            <article className='media'>
              <img src={user.data.image} alt={user.data.id} />
              <div className='info'>
                <div className='bio'>
                  <h3 className='title'>{user.data.name}</h3>
                  {user.data.avgRating > 0 ?
                    <h3>{user.data.avgRating} <span className='star'>★</span></h3>
                    :
                    <h5>Not yet rated</h5>}
                  <h4>{user.data.city}</h4>
                </div>
                <div className='skills-offers'>
                  {user.data.skills.map((skill, i) => (
                    <p key={i} className='offer-skills'>{skill}</p>
                  ))}
                </div>
                <div className='offer-buttons'>
                  <button onClick={() => this.handleAccept(user.data)} className='button is-success'>Accept</button>
                  <button onClick={() => this.handleDelete(user.data)} className='button is-danger'>Delete</button>
                </div>
              </div>
            </article>
          </div>
        })
          : <h5 className='none'>None Pending</h5>}
        <h2 className='accepted'>Accepted:</h2>
        {offersAccepted.length ? offersAccepted.map((user, i) => {
          return <div key={i} className='box'>
            <article className='media'>
              <img src={user.data.image} alt={user.data.id} />
              <div className='info'>
                <div className='bio'>
                  <h3 className='title'>{user.data.name}</h3>
                  {user.data.avgRating > 0 ?
                    <h3>{user.data.avgRating} <span className='star'>★</span></h3>
                    :
                    <h5>Not yet rated</h5>}
                  <h4>{user.data.city}</h4>
                </div>
                <div className='skills-offers'>
                  {user.data.skills.map((skill, i) => (
                    <p key={i} className='offer-skills'>{skill}</p>
                  ))}
                </div>
                <div className='contact'>
                  <h4>Get in contact:</h4>
                  <p className='email'>{user.data.email}</p>
                  <div className='offer-buttons'>
                    <button onClick={() => this.handleDeleteAccepted(user)} className='button is-danger'>Delete</button>
                  </div>
                </div>
              </div>
            </article>
          </div>
        })
          : <h5 className='none'>None Accepted</h5>}
      </section>
    )
  }
}
export default Offers