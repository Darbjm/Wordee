import React from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import Auth from '../../lib/auth'

class UserReview extends React.Component {
  state = {
    user: {},
    rating: '',
    review: '',
    timestamps: ''
  }

  async componentDidMount() {
    const chefId = this.props.match.params.id
    try {
      const res = await axios.get(`/api/chefs/${chefId}`, {
        headers: { Authorization: `Bearer ${Auth.getToken()}` }
      })
      this.setState({ user: res.data, review: res.data.review })
    } catch (err) {
      this.props.history.push('/notfound')
    }
  }

  render() {
    if (!this.state.user.name) return null
    const { name, _id, image, avgRating, ratingsCount } = this.state.user
    console.log(this.state.user)
    return (
      <>
        <section className='hero is-fullheight-with-navbar'>
          <div className='hero-body-index'>
          </div>
          <h2 className='skill-header'>REVIEWS : </h2>
          <Link to={`/chefs/${_id}`} key={_id}>
            <div className='box'>
              <h1>{name}</h1>
              <article className='media'>
                <img src={image} alt={name} />
                <div className='info'>
                  <div className='bio'>
                    {avgRating ?
                      <><h3>{avgRating}<span className='star'>★</span></h3><p>{ratingsCount}</p></>
                      :
                      <p>No reviews yet, be the first!</p>}
                    {this.state.review.map((rev, i) => (
                      <h3 key={i} className='subtitle'> Comments: {rev.review}</h3>
                    ))
                    }
                  </div>
                </div>
              </article>
            </div>
          </Link>
        </section>
      </>
    )
  }
}

export default UserReview

// import React from 'react'
// import axios from 'axios'
// import {Link} from 'react-router-dom'

// class UserReview extends React.Component {
//   state = {
//     users: [],
//     // user: {},
//     review: '',
//     timestamps: ''
//     // avgRating: ''
//   }

//   async componentDidMount() {
//     const chefId = this.props.match.params.id
//     try {
//       const res = await axios.get(`/api/chefs/${chefId}`)
//       this.setState({ users: res.data, review: res.data.review })
//     } catch (err) {
//       this.props.history.push('/notfound')
//     }
//   }

//   render() {
//     // if (!this.state.users) return null
//     // const { name, image, timestamps } = this.state.user
//     console.log(this.state.users)
//     return (
//       <>
//         {this.state.users.map(user => (
//           <Link to={`/chefs/${user._id}`} key={user._id}>
//             <div className='box'>
//               <h1>{user.name}</h1>
//               <article className='media'>
//                 <img src={user.image} alt={user.name} />
//                 <div className='info'>
//                   <div className='bio'>
//                     {/* {this.state.rating.reduce(rate => (
//                     <h3 key={rate._id} className='subtitle'>{rate.rating}</h3>
//                   ))} */}
//                     {/* <h3 className='subtitle'>★ ★ ★ ★ ☆</h3> */}
//                     {/* <h3 className='subtitle'>Date reviewed: {timestamps}</h3> */}
//                     {this.state.review.map((rev, i) => (
//                       <div key={i}>
//                         <h3 className='subtitle'>Comments: {rev.review}</h3>
//                         <h3 className='subtitle'>Comments: {rev._id}</h3>
//                       </div>
//                     ))}
//                     {/* <h3 className='subtitle'>{this.state.review}</h3> */}
//                   </div>
//                 </div>
//               </article>
//             </div>
//           </Link>
//         ))}
//       </>
//     )
//   }
// }

// export default UserReview