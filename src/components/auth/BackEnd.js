import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { getToken } from '../lib/auth'

const BackEnd = () => {
  const [user, setData] = useState({})

  useEffect(() => {
    const getData = async () => {
      try {
        const res = await axios.get('/api/all', {
          headers: { Authorization: `Bearer ${getToken()}` }
        })
        setData(res.data)
        console.log(res)
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
              <div>username: {one.username}</div>
              <div>email: {one.email}</div>
              <div>logo: {one.logo}</div>
              <div>website: {one.website}</div>
              <div>blog: {one.blog}</div>
              <div>
                {one.docs &&
                  one.docs.map((doc, i) => (
                    <div className="sec" key={i}>
                      <hr />
                      doc:
                      <div>url: {doc.doc}</div>
                      <div>name: {doc.name}</div>
                      <hr />
                    </div>
                  ))}
              </div>
              <div>
                {one.briefs &&
                  one.briefs.map((brief, i) => (
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
                {one.images &&
                  one.images.map((doc, i) => (
                    <div className="sec" key={i}>
                      <hr />
                      image:
                      <div>url: {doc.url}</div>
                    </div>
                  ))}
              </div>
              <div className="user"></div>
            </div>
          ))}
      </section>
    </main>
  )
}

export default BackEnd
