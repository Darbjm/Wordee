import propTypes from 'prop-types'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { getToken } from '../lib/auth'
import Navbar from '../common/Navbar'
import folder from '../../styles/images/folder.svg'

const Profile = ({
  match: {
    params: { id }
  }
}) => {
  const [user, setData] = useState({})

  useEffect(() => {
    const getData = async () => {
      try {
        const res = await axios.get(`/api/brands/${id}`, {
          headers: { Authorization: `Bearer ${getToken()}` }
        })
        setData(res.data)
      } catch (err) {
        console.log(err)
      }
    }
    getData()
  }, [id])

  return (
    <main>
      <Navbar />
      <section className="brandprofile">
        <div className="left-side">
          <div className="branding">
            {user.cover ? (
              <img className="user-cover" src={user.cover} alt={user.cover} />
            ) : (
              
              <Link to={`/profile/${id}/edit`} className="user-cover">
                <div>                  
                  <img className="cover" src="" alt="no cover" />
                </div>
              </Link>
            )}
            {user.logo ? (
              <img className="profile-logo" src={user.logo} alt="Logo" />
            ) : (
              <Link to={`/profile/${id}/edit`} className="logo-circle">
                <img className="logo" src="" alt="no logo" />
              </Link>
            )}</div>
          <hr/>
          <div className="sect">
            <h2 style={{ display: 'inline' }}>Name:</h2> <p style={{ display: 'inline' }}>{user.username}</p> <br/>
            <h2 style={{ display: 'inline' }}>Website:</h2> <p style={{ display: 'inline' }}>{user.website ? user.website : ''}</p> <br/>
            <h2 style={{ display: 'inline' }}>Blog/refernce url:</h2> <p style={{ display: 'inline' }}>{user.blog ? user.blog : ''}</p>
          </div>
          <hr />
          <div className="sect">
            <h2>Summary:</h2> <p>{user.summary ? user.summary : ''}</p>
          </div>
          <hr />
          <div className="sect">
            {user.image && user.image.length ? (
              user.image &&
            user.image.map((img, i) => (
              <img
                className="brand-imagery"
                src={img.url}
                key={i}
                alt={`${user.username} image`}
              />
            ))
            ) : (
              <Link to={`/profile/${id}/edit`} className="no-image">
                <div>Add images</div>
              </Link>
            )}
          </div>
          <hr />
          <div className="sect">
            <div className="documents">
              {user.docs && user.docs.length ? (
                user.docs.map((img, i) => (
                  <div className="docs" key={i}>
                    <a href={img.url} target='_blank' rel='noopener noreferrer'>
                      <img
                        className="file-imagery"
                        src={folder}
                        key={i}
                        alt={`${user.username} docs`}
                      />
                    </a>
                    {img.name}
                  </div>
                ))
              ) : (
                <Link to={`/profile/${id}/edit`} className="no-image">
                  <div>Add docs</div>
                </Link>
              )}
            </div>
          </div>
          <hr />
          <div className="sect">
            <p>
              The Writers assigned to your briefs will see these references:
            </p>
          </div>
          <hr/>
          <div className="sect">
            <Link to={`/profile/${id}/edit`}>
              <button type="button" className="button is-rounded is-large">
              Edit profile
              </button>
            </Link>
          </div>
        </div>
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
