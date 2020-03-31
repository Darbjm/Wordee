import React from 'react'
import axios from 'axios'
import Auth from '../../lib/auth'
import { Link } from 'react-router-dom'

class UserShow extends React.Component {
  state = {
    user: {},
    skills: [],
    review: '',
    ratingsCount: 0,
    pending: false,
    accepted: false
  }

  async getData() {
    const chefId = this.props.match.params.id
    try {
      const res = await axios.get(`/api/chefs/${chefId}`, {
        headers: { Authorization: `Bearer ${Auth.getToken()}` }
      })
      this.setState({ user: res.data, skills: res.data.skills })
      this.countRatings(res)
    } catch (err) {
      this.props.history.push('/notfound')
    }
  }

  componentDidMount() {
    this.getData()
    this.isPending()
    this.isAccepted()
  }

  handleChange = ({ target: { name, value } }) => {
    const user = { ...this.state.user, [name]: value }
    this.setState({ user })
  }

  handleSubmit = async e => {
    e.preventDefault()
    e.target.innerHTML = '<h2>Review submitted</h2>'
    const chefId = this.props.match.params.id
    try {
      const res = await axios.post(`/api/chefs/${chefId}/rating`, this.state.user, {
        headers: { Authorization: `Bearer ${Auth.getToken()}` }
      })
      this.getData()
      this.countRatings(res)
      const rev = await axios.post(`/api/chefs/${chefId}/review`, this.state.user, {
        headers: { Authorization: `Bearer ${Auth.getToken()}` }
      })
      this.submitReview(rev)
    } catch (err) {
      this.setState({ error: 'Invalid Credentials' })
    }
  }

  countRatings = (res) => {
    const ratingsCount = res.data.rating.length
    this.setState({ ratingsCount })
  }

  submitReview = (rev, res) => {
    const review = rev.data.review.length
    const ratingsCount = res.data.rating.length
    this.setState({ review, ratingsCount })
  }

  offerPending = async () => {
    this.setState({ pending: true })
    const chefId = this.props.match.params.id
    try {
      await axios.post(`/api/chefs/${chefId}/offersPending`, null, {
        headers: { Authorization: `Bearer ${Auth.getToken()}` }
      })
      this.changeButton()
    } catch (err) {
      console.log(err.response)
    }
  }

  changeButton = () => {
    this.setState({ colab: false })
  }


  handleDelete = async () => {
    const chefId = this.props.match.params.id
    try {
      await axios.delete(`/api/chefs/${chefId}`, {
        headers: { Authorization: `Bearer ${Auth.getToken()}` }
      })
      this.props.history.push('/chefs')
    } catch (err) {
      console.log(err.response)
    }
  }

  isPending = async () => {
    const chefId = this.props.match.params.id
    try {
      const res = await axios.get(`/api/chefs/${chefId}`, {
        headers: { Authorization: `Bearer ${Auth.getToken()}` }
      })
      const isPending = res.data.offersPending.find(offer => offer.offeringUser === Auth.getUser())
      if (isPending) {
        this.setState({ pending: true })
      }
    } catch (err) {
      console.log(err)
    }
  }

  isAccepted = async () => {
    const chefId = this.props.match.params.id
    try {
      const res = await axios.get(`/api/chefs/${chefId}`, {
        headers: { Authorization: `Bearer ${Auth.getToken()}` }
      })
      const isAccepted = res.data.offersAccepted.find(offer => offer.acceptedUser === Auth.getUser())
      console.log(isAccepted)
      if (isAccepted) {
        this.setState({ accepted: true })
      }
    } catch (err) {
      console.log(err)
    }
  }


  hasRatings = () => this.state.user.avgRating > 0

  render() {
    const { name, city, image, avgRating, _id, email } = this.state.user
    const { ratingsCount, skills, pending, accepted } = this.state
    if (!this.state.user) return null
    return (
      <section className='user-section'>
        <div className='profilelayer'>
          <img className='profile-image img-eight' src='./../assets/background/mexican.png'></img>
        </div>
        <div className='user-container'>
          <div className='user-info fadeInLeft'>
            <div className='userInfo'>
              <hr />
              <h2 className='username'>{name}</h2>
              <hr />
              <div className='star-rating'>
                {ratingsCount ?
                  <><h2>{avgRating} ★</h2><p>{ratingsCount} reviews</p></>
                  :
                  <p>No ratings received</p>}
              </div>
              <Link to={`/chefs/${_id}/review`}>
                <div className='allReviews'>
                  <p>Read reviews</p>
                </div>
              </Link>
              <p>{city}</p>
            </div>
          </div>
          <div className='user-image'>
            <figure className='image-container'>
              <img className='chef-image' src={image} alt={name} />
            </figure>
            <br />
            {accepted ? <div className='user-email button'>You have connected with {name} contact here at {email}</div> : (pending ? <button className='button is-danger'>Sent</button> : <button className='button is-success' onClick={this.offerPending}>Collaborate?</button>)}
          </div>
          <div className='skills-recipes fadeInRight'>
            <div className='usersSkills'>
              <h2 className='title'>Skills</h2>
              {skills.map((skill, i) => <p key={i}>- {skill}</p>)}
            </div>
            <div className='rating'>
              <form onSubmit={this.handleSubmit} className='rating-form'>
                <h2 className='title'>Leave a review!</h2>
                <div className='rate'>
                  <input onChange={this.handleChange} type='radio' id='star5' name='rating' value='5' />
                  <label htmlFor='star5' title='text'>5 stars</label>
                  <input onChange={this.handleChange} type='radio' id='star4' name='rating' value='4' />
                  <label htmlFor='star4' title='text'>4 stars</label>
                  <input onChange={this.handleChange} type='radio' id='star3' name='rating' value='3' />
                  <label htmlFor='star3' title='text'>3 stars</label>
                  <input onChange={this.handleChange} type='radio' id='star2' name='rating' value='2' />
                  <label htmlFor='star2' title='text'>2 stars</label>
                  <input onChange={this.handleChange} type='radio' id='star1' name='rating' value='1' />
                  <label htmlFor='star1' title='text'>1 star</label>
                </div>
                <br />
                <textarea className='textarea is-primary' onChange={this.handleChange} placeholder='Enter your review..' name='review' type='text' maxLength='200' />
                <br />
                <button className='button is-info' type='submit'>Submit</button>
              </form>
            </div>
          </div>
        </div>
      </section>
    )
  }
}

export default UserShow
