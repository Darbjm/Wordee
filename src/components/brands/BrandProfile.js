import propTypes from 'prop-types'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
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
  const [user, setUser] = useState({})
  const [success, setSuccess] = useState(false)

  useEffect(() => {
    getData()
  }, [id])

  /**Get profile data */
  const getData = async () => {
    // docs {
    //   _id
    //   name
    //   url
    // }
    // image {
    //   _id
    //   name
    // }
    const reqBody = {
      query: `
        query {
          singleUser {
            _id
            username
            email
            logo
            summary
            cover
            website
            blog
            reportSummary
            liveBriefs {
              _id
              title
              keyword1
            }
            completedBriefs {
              _id
              title
              keyword1
            }
          }
        }
      `
    }
    try {
      const {
        data: { data: { singleUser } }
      } = await axios.post('http://localhost:4000/graphql', reqBody, {
        headers: { Authorization: `Bearer ${getToken()}` }
      })
      setUser(singleUser)
    } catch (err) {
      console.log(err)
    }
  }

  /** Submit new profile information. */
  const handleSubmit = async e => {
    e.preventDefault()
    try {
      if (!user.username || !user.email) return
      if (!user.blog) user.blog = ''
      if (!user.summary) user.summary = ''
      if (!user.website) user.website = ''
      const newData = {
      query:`
      mutation {
        editUser(userInput: {
          email: "${user.email}", 
          username: "${user.username}",
          blog: "${user.blog}",
          website: "${user.website}",
          summary: "${user.summary}"
        }){
          email
          username
          blog
          website
          summary
        }
      }
      `
    }
      await axios.post('http://localhost:4000/graphql', newData, {
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
    const deleteData = {
      query:`
      mutation {
        deleteUser(userId: "${user._id}"){
          email
          username
        }
      }
      `
    }
    try {
      await axios.post('http://localhost:4000/graphql', deleteData, { headers: { Authorization: `Bearer ${getToken()}` }
        })
      logout()
      history.push('/')
    } catch (err) {
      console.log(err)
    }
  }

  return (
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
                  setUser({ ...user, [name]: value })
                }/> 
              <br/>
              <h2 style={{ display: 'inline' }}>Email:</h2> 
              <input 
                style={{ display: 'inline' }} 
                value={user.email || ''} 
                placeholder="Email"
                name="email"
                onChange={({ target: { name, value } }) =>
                  setUser({ ...user, [name]: value })
                }/> 
              <br/>
              <h2 style={{ display: 'inline' }}>Website:</h2> 
              <input 
                style={{ display: 'inline' }} 
                value={user.website || ''} 
                placeholder="Website"
                name="website"
                onChange={({ target: { name, value } }) =>
                  setUser({ ...user, [name]: value })
                }/> 
              <br/>
              <h2 style={{ display: 'inline' }}>Blog/refernce url:</h2> 
              <input 
                style={{ display: 'inline', width: '25%' }} 
                value={user.blog || ''}
                placeholder="Blog/refernce url"
                name="blog"
                onChange={({ target: { name, value } }) =>
                  setUser({ ...user, [name]: value })
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
                  setUser({ ...user, [name]: value })
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
  )
}

Profile.propTypes = {
  match: propTypes.shape({
    params: propTypes.shape({
      id: propTypes.string.isRequired
    })
  })
}

export default Profile
