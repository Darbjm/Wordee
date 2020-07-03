import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { getToken } from '../lib/auth'
import folder from '../../styles/images/folder.svg'

const BackEnd = () => {
  const [user, setData] = useState({})

  useEffect(() => {
    const getData = async () => {
      try {
        const res = await axios.get('/api/all', {
          headers: { Authorization: `Bearer ${getToken()}` }
        })
        setData(res.data)
      } catch (err) {
        console.log(err)
      }
    }
    getData()
  }, [])
  return (
    <main>
      <section className="back">
        {user[0] &&
          user.map((one, i) => (
            <div key={i} className="each">
              <img src={one.logo} alt={one.logo} className='backend-logo'/>
              <div>username: {one.username}</div>
              <div>email: {one.email}</div>
              <div>logo: {one.logo}</div>
              <div>website: {one.website}</div>
              <div>blog: {one.blog}</div>
              <hr />
              <div>
                {one.docs &&
                  one.docs.map((doc, i) => (
                    <div className="sec" key={i}>
                      doc:
                      <br />
                      <a href={doc.url} target='_blank' rel='noopener noreferrer'>
                        <img src={folder} alt={folder} className='backend-folder'/>
                      </a>
                      <div>url: {doc.url}</div>
                      <div>name: {doc.name}</div>
                      <hr />
                    </div>
                  ))}
              </div>
              <div>
                {one.liveBriefs &&
                  one.liveBriefs.map((brief, i) => (
                    <div className="sec" key={i}>
                      brief:
                      <div>title: {brief.title}</div>
                      <div>first_draft: {brief.first_draft}</div>
                      <div>keyword1: {brief.keyword1}</div>
                      <div>keyword2: {brief.keyword2}</div>
                      <div>keyword3: {brief.keyword3}</div>
                      <div>length: {brief.length}</div>
                      <div>level: {brief.level}</div>
                      <div>message: {brief.message}</div>
                      <div>purpose: {brief.purpose}</div>
                      <div>sentance: {brief.sentance}</div>
                      <div>topic: {brief.topic}</div>
                      <div>url: {brief.url}</div>
                      <hr />
                    </div>
                  ))}
              </div>
              <div>
                {one.image &&
                  one.image.map((doc, i) => (
                    <div className="sec" key={i}>
                      image:
                      <br />
                      <img src={doc.url} alt={doc.url} className='backend-logo'/>
                      <div>url: {doc.url}</div>
                    </div>
                  ))}
              </div>
              <hr />
              <div className="user"></div>
            </div>
          ))}
      </section>
    </main>
  )
}

export default BackEnd
