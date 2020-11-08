import React, { useEffect, useState } from 'react'
import axios from 'axios'
import {
  Accordion,
  AccordionItem,
  AccordionItemHeading,
  AccordionItemButton,
  AccordionItemPanel
} from 'react-accessible-accordion'
import ReactHTMLTableToExcel from 'react-html-table-to-excel'
import 'react-accessible-accordion/dist/fancy-example.css'
import Navbar from '../common/Navbar'
import { getToken } from '../lib/auth'
import folder from '../../styles/images/folder.svg'

const BackEnd = () => {
  const [brands, setBrands] = useState({})
  const [report, setReport] = useState({})
  const [filterBrand, setBrandFilter] = useState('')

  const getData = async () => {
    try {
      const res = await axios.get('/api/all', {
        headers: { Authorization: `Bearer ${getToken()}` }
      })
      setBrands(res.data)
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
      <Navbar />
      <section className='backend'>
        <div>
          <h1>Wordee admin panel</h1>
        </div>
        <div className='search'>
          <input 
            className="input" 
            type="text"
            placeholder='Search by brand name'
            onChange={({ target: { value } }) => {
              setBrandFilter(value)
            }}/>
        </div>
        <div className='brands'>
          <Accordion allowZeroExpanded>
            {brands[0] && brands.filter(brand => {
              const regEx = new RegExp(filterBrand, 'gi')
              return brand.username.match(regEx)
            }).map(filteredBrands => (
              <AccordionItem key={filteredBrands.username}>
                <AccordionItemHeading>
                  <AccordionItemButton>
                    <div className='accordionTitle'>
                      <img src={filteredBrands.logo} className='accordionlogo'/><h1>{filteredBrands.username}</h1>
                    </div>
                  </AccordionItemButton>
                </AccordionItemHeading>
                <AccordionItemPanel>
                  <p>Brandsname: {filteredBrands.username}</p>
                  <p>Email: {filteredBrands.email}</p>
                  <p>Logo: {filteredBrands.logo}</p>
                  <p>Website: {filteredBrands.website}</p>
                  <p>Blog: {filteredBrands.blog}</p>
                  <p>Report summary: {filteredBrands.reportSummary}</p>
                  <form onSubmit={submit} >
                    <div className="field">
                      <div className="control">
                        <input 
                          className="input" 
                          type="text" 
                          placeholder="Report link" 
                          name="reportSummary"
                          onChange={({ target: { value } }) => { 
                            setReport({ id: filteredBrands._id, reportSummary: value })
                          }
                          }
                        />
                      </div>
                    </div>
                    <button>Send</button>
                  </form>
                  <hr />
                  <div>
                    <h2>Brands documents:</h2>
                    {filteredBrands.docs &&
                  filteredBrands.docs.map((doc, i) => (
                    <div className="sec" key={i}>
                      <br/>
                      <h4>name: {doc.name}</h4>
                      <br />
                      <a href={doc.url} target='_blank' rel='noopener noreferrer'>
                        <img src={folder} alt={folder} className='backend-folder'/>
                      </a>
                      <div>url: {doc.url}</div>
                      <hr />
                    </div>
                  ))}
                  </div>
                  <div>
                    <h2>Brands briefs:</h2>
                    <br />
                    {filteredBrands.liveBriefs &&
                  filteredBrands.liveBriefs.map((brief, i) => (
                    <div key={i}>
                      <table className="table is-hoverable is-bordered is-striped" id={`table ${i}`}>
                        <tbody>
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
                          {/* decide whether to show extra questions or not */}
                          {brief.purpose === 'Sell a product or service' ? 
                            <>
                              <tr>
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
                            : null}
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
                    <h2>Brands images:</h2>
                    {filteredBrands.image &&
                  filteredBrands.image.map((image, i) => (
                    <div className="sec" key={i}>
                      
                      <br />
                      <img src={image.url} alt={image.url} className='accordionImage'/>
                      <div>url: {image.url}</div>
                    </div>
                  ))}
                  </div>
                </AccordionItemPanel>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>
    </main>
  )
}

export default BackEnd
