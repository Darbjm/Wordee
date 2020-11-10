import propTypes from 'prop-types'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { addUserInfo } from '../../redux/user/userActions'
// import { fetchUsers } from '../redux'
import { getToken, getUser, logout } from '../lib/auth'
import Navbar from '../common/Navbar'
import BrandFiles from '../brands/BrandFiles'
import BrandImages from './BrandImages'
import BrandLogo from './BrandLogo'
import BrandCover from './BrandCover'

/** Component for displaying and editing profile information */
const Profile = ({
  history,
  match: {
    params: { id }
  }
}) => {
  // const [user, setUser] = useState({})
  const [success, setSuccess] = useState(false)
  const user = useSelector(state => state.user)
  const dispatch = useDispatch()

  useEffect(() => {
    getData()
  }, [id])

  /**Get profile data */
  const getData = async () => {
    try {
      const res = await axios.get(`/api/brands/${id}`, {
        headers: { Authorization: `Bearer ${getToken()}` }
      })
      // setUser(res.data)
      dispatch(addUserInfo(res.data))
    } catch (err) {
      console.log(err)
    }
  }

  /** Submit new profile information. */
  const handleSubmit = async e => {
    e.preventDefault()
    try {
      // currently inefficient because it sends up data that might not be changed
      const newData = {
        username: user.username,
        email: user.email,
        summary: user.summary,
        blog: user.blog,
        website: user.website,
        cover: user.cover
      }
      await axios
        .put(`/api/brands/${getUser()}`, newData, {
          headers: { Authorization: `Bearer ${getToken()}` }
        })
      setSuccess(!success)
      setTimeout(() => {
        setSuccess(false)
      }, 3000)
    } catch (err) {
      console.log(err)
    }
  }

  /**Delete brand */
  const deleteBrand = async e => {
    e.preventDefault()
    try {
      await axios
        .delete(`/api/brands/${user.id}`, { headers: { Authorization: `Bearer ${getToken()}` }
        })
      logout()
      history.push('/')
    } catch (err) {
      console.log(err)
    }
  }
  
  return user ? (
    <main>
      <Navbar />
      <section className="brandprofile">
        <div className="left-side">
          <div className="branding">
            <BrandCover user={user} getData={getData}/>
            <BrandLogo user={user} getData={getData}/>
          </div>
          <hr/>
          <div className="sect">
            <form onSubmit={(e) => handleSubmit(e)}>
              <h2 style={{ display: 'inline' }}>Name:</h2>
              <input 
                style={{ display: 'inline' }} 
                value={user.username || ''} 
                placeholder="Brandname"
                name="username"
                onChange={({ target: { name, value } }) =>
                  dispatch(addUserInfo({ ...user, [name]: value }))
                }/> 
              <br/>
              <h2 style={{ display: 'inline' }}>Email:</h2> 
              <input 
                style={{ display: 'inline' }} 
                value={user.email || ''} 
                placeholder="Email"
                name="email"
                onChange={({ target: { name, value } }) =>
                  dispatch(addUserInfo({ ...user, [name]: value }))
                }/> 
              <br/>
              <h2 style={{ display: 'inline' }}>Website:</h2> 
              <input 
                style={{ display: 'inline' }} 
                value={user.website || ''} 
                placeholder="Website"
                name="website"
                onChange={({ target: { name, value } }) =>
                  dispatch(addUserInfo({ ...user, [name]: value }))
                }/> 
              <br/>
              <h2 style={{ display: 'inline' }}>Blog/refernce url:</h2> 
              <input 
                style={{ display: 'inline', width: '25%' }} 
                value={user.blog || ''}
                placeholder="Blog/refernce url"
                name="blog"
                onChange={({ target: { name, value } }) =>
                  dispatch(addUserInfo({ ...user, [name]: value }))
                } 
              />
              <br/>
              <button type='submit' style={{ marginRight: '10px' }} className="button is-small blue is-rounded">Save</button>
              {success ? 'Success!' : null}
            </form>
          </div>
          <hr />
          <div className="sect">
            <h2>Summary:</h2>
            <form onSubmit={(e) => handleSubmit(e)}>
              <textarea 
                value={user.summary || ''} 
                style={{ width: '100%' }} 
                rows="16"
                name="summary"
                onChange={({ target: { name, value } }) =>
                  dispatch(addUserInfo({ ...user, [name]: value }))
                }
              />
              <button type='submit' style={{ marginRight: '10px' }} className="button is-small blue is-rounded">Save</button>
              {success ? 'Success!' : null}
            </form> 
          </div>
          <hr />
          <div className="sect">
            <BrandImages user={user} getData={getData}/>
          </div>
          <hr />
          <div className="sect">
            <BrandFiles user={user} getData={getData}/>
          </div>
          <hr />
          <div className="sect">
            <p>
              The Writers assigned to your briefs will see this information
            </p>
          </div>
          <hr/>
          <div className="sect">
            <button className='button is-rounded is-danger' onClick={e => deleteBrand(e)}>Delete Brand</button>
          </div>
        </div>
        {/* Change to aside */}
        <div className="right-side">
          <h3>Report Summary</h3>
          {user.reportSummary ? <a href={user.reportSummary} rel="noopener noreferrer" target="_blank" className='link'>Read report here</a> : <p>Pending</p> }
          <hr />
          <h3>Live Briefs</h3>
          <ol>
            {user.liveBriefs && user.liveBriefs.length
              ? user.liveBriefs.map((brief, i) => (
                <Link key={i} to={`/editbrief/${brief._id}`}>
                  <li className="lists">
                    <div className="bluetext">
                      {brief.title} - {brief.keyword1}
                    </div>
                  </li>
                </Link>
              ))
              : 'None'}
          </ol>
          <hr />
          <h3>Completed Briefs</h3>
          <ol>
            {user.completedBriefs && user.completedBriefs.length
              ? user.completedBriefs.map((brief, i) => (
                <Link key={i} to={`/editbrief/${brief._id}`}>
                  <li className="lists">
                    <div className="bluetext">
                      {brief.title} - {brief.keyword1}
                    </div>
                  </li>
                </Link>
              ))
              : 'None'}
          </ol>
        </div>
      </section>
    </main>
  ) : (<main style={{ height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}><h1>Loading...</h1></main>)
}

Profile.propTypes = {
  match: propTypes.shape({
    params: propTypes.shape({
      id: propTypes.string.isRequired
    })
  }),
  history: propTypes.func.isRequired
}

export default Profile
