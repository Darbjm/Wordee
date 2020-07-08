import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { getToken } from '../lib/auth'
import folder from '../../styles/images/folder.svg'
import ReactHTMLTableToExcel from 'react-html-table-to-excel'

const BackEnd = () => {
  const [user, setUser] = useState({})
  const [report, setReport] = useState({})

  const getData = async () => {
    try {
      const res = await axios.get('/api/all', {
        headers: { Authorization: `Bearer ${getToken()}` }
      })
      setUser(res.data)
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    getData()
  }, [])

  const submit = async e => {
    e.preventDefault()
    try {
      console.log(report.id, report.reportSummary)
      await axios.post(`/api/report/add/${report.id}`, report, {
        headers: { Authorization: `Bearer ${getToken()}` }
      })
      getData()
    } catch (err) {
      console.log(err)
    }
  }
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
              <div>Report Summary: {one.reportSummary}</div>
              <form onSubmit={submit} >
                <div className="field">
                  <div className="control">
                    <input 
                      className="input" 
                      type="text" 
                      placeholder="Report link" 
                      name="reportSummary"
                      onChange={({ target: { value } }) => { 
                        setReport({ id: one._id, reportSummary: value })
                      }
                      }
                    />
                  </div>
                </div>
                <button>Send</button>
              </form>
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
                <h1>Briefs:</h1>
                <br />
                {one.liveBriefs &&
                  one.liveBriefs.map((brief, i) => (
                    <div key={i}>
                      <table className="table is-hoverable is-bordered is-striped" id={`table ${i}`}>
                        <thead> <tbody>
                          <tr>
                            <th>Title:</th>
                            <td>{brief.title}</td>
                          </tr>
                          <tr>
                            <th>Content Needed:</th>
                            <td>{brief.content}</td>
                          </tr>
                          <tr>
                            <th>Length:</th>
                            <td>{brief.length} words</td>
                          </tr>
                          <tr>
                            <th>Length:</th>
                            <td>{brief.length} words</td>
                          </tr>
                          <tr>
                            <th>Level of writer:</th>
                            <td>{brief.level}</td>
                          </tr>
                          <tr>
                            <th>The purpose of this content is to:</th>
                            <td>{brief.purpose}</td>
                          </tr>
                          {brief.purpose === 'Sell a product or service' ? 
                            <><tr>
                              <th>Name of product or service:</th>
                              <td>{brief.prodName}</td>
                            </tr>
                            <tr>
                              <th>Is it new or lanched?:</th>
                              <td>{brief.new}</td>
                            </tr>
                            <tr>
                              <th>Key selling points:</th>
                              <td className='padding'>
                                <ol>
                                  <li>{brief.keypoint1}</li>
                                  <li>{brief.keypoint2}</li>
                                  <li>{brief.keypoint3}</li>
                                  <li>{brief.keypoint4}</li>
                                  <li>{brief.keypoint5}</li>
                                </ol>
                              </td>
                            </tr>
                            </>
                            : ''}
                          <tr>
                            <th>Description of purpose in a sentance:</th>
                            <td>{brief.sentance}</td>
                          </tr>
                          <tr>
                            <th>Message the audience should leave with:</th>
                            <td>{brief.message}</td>
                          </tr>
                          <tr>
                            <th>Reference URL:</th>
                            <td>{brief.url}</td>
                          </tr>
                          <tr>
                            <th>First draft needed by:</th>
                            <td>{brief.first_draft}</td>
                          </tr>
                          <tr>
                            <th>The Topic is:</th>
                            <td>{brief.topic}</td>
                          </tr>
                          <tr>
                            <th>keyword1:</th>
                            <td>{brief.keyword1}</td>
                          </tr>
                          <tr>
                            <th>keyword2:</th>
                            <td>{brief.keyword2}</td>
                          </tr>
                          <tr>
                            <th>keyword3:</th>
                            <td>{brief.keyword3}</td>
                          </tr>
                        </tbody>
                        </thead>
                      </table>
                      <ReactHTMLTableToExcel
                        id="table-xls-button"
                        className="download-table-xls-button"
                        table={`table ${i}`}
                        filename={brief.title}
                        sheet="tablexls"
                        buttonText="Download as Excel"/>
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
