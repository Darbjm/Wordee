// import React from 'react'
// import axios from 'axios'
// // import { Link } from 'react-router-dom'
// // import Auth from '../../lib/auth'

// // 

// class UserMessages extends React.Component {
//   state = {
//     user: {}
//   }


//   async componentDidMount() {
//     // const chefId = this.props.match.params.id
//     try {
//       const res = await axios.get('/api/chefs')
//       this.setState({ user: res.data })
//     } catch (err) {
//       this.props.history.push('/notfound')
//     }
//   }

//   handleSubmit = async e => {
//     e.preventDefault()
//     // e.target.innerHTML = '<h2>Review submitted</h2>'
//     // const chefId = this.props.match.params.id
//     try {
//       const res = await axios.post('/api/messages/')
//       this.submitMessage(res)
//     } catch (err) {
//       this.setState({ error: 'Invalid Credentials' })
//     }
//   }

//   submitMessage = (res) => {
//     const message = res.data.review.length
//     this.setState({ message })
//   }

//   render() {
//     if (!this.state.user) return null
//     const { user } = this.state
//     console.log(this.state.user)
//     return (
//       <>
//         {/* {this.state.users.map(user => (
//           <Link to={`/chefs/${user._id}`} key={user._id}>
//             {console.log(user)} */}
//         <div className='box'>
//           <article className='media'>
//             <img src={user.image} alt={user.name} />
//             <div className='info'>
//               <div className='bio'>
//                 <h3 className='title'>{user.name}</h3>
//                 {user.avgRating > 0 ?
//                   <h3>{user.avgRating} <span className='star'>★</span></h3>
//                   :
//                   null}
//                 <h4>{user.city}</h4>
//               </div>
//               {/* <div className='skills'>
//                 {user.skills.map((skill, i) => <p key={i}>{skill}</p>)}
//               </div> */}
//             </div>
//           </article>
//           <div className='inbox'>
//             <form onSubmit={this.handleSubmit} className='messages'>
//               <input onChange={this.handleChange} name='review' type='text' maxLength='200' />
//               <button className='button is-link is-rounded' type='submit'>Send</button>
//             </form>
//           </div>
//         </div>
//         {/* </Link> */}
//       </>
//     )
//   }
// }

// export default UserMessages