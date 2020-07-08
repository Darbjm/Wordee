import propTypes from 'prop-types'
import React, { useState } from 'react'
import axios from 'axios'
import { getToken, getUser } from '../lib/auth'
import BriefForm from './BriefForm'
import Navbar from '../common/Navbar'

const Brandbrief = ({ history }) => {
  const [data, setData] = useState({
    title: '',
    content: '',
    length: '',
    level: '',
    purpose: '',
    prodName: '',
    new: '',
    keypoint1: '',
    keypoint2: '',
    keypoint3: '',
    sentance: '',
    message: '',
    url: '',
    first_draft: '',
    topic: '',
    keyword1: '',
    keyword2: '',
    keyword3: ''
  })
  const [errors, setErrors] = useState({})
  const [extra, setExtra] = useState(false)

  const handleSubmit = async e => {
    e.preventDefault()
    try {
      const keys = Object.keys(data)
      const vals = Object.values(data)
      const newError = {}
      vals.forEach((value, i) => {
        if (value === '') {
          newError[keys[i]] = 'Please complete all sections' 
        }
      })
      setErrors(newError)
      if (Object.keys(newError).length > 0) return
      await axios.post('/api/briefs/add', data, {
        headers: { Authorization: `Bearer ${getToken()}` }
      })
      history.push(`/profile/${getUser()}`)
    } catch (err) {
      setErrors(err.response.data)
    }
  }

  return (
    <>
      <Navbar />
      <main>
        <section className="createbrief">
          {console.log(data)}
          <BriefForm
            header="Create Brief"
            type="Create Brief"
            data={data}
            errors={errors}
            extra={extra}
            handleChange={({ target: { name, value } }) => {
              if (name === 'purpose' && value !== 'Sell a product or service') {
                setExtra(false)
                delete data['prodName']
                delete data['new']
                delete data['keypoint1']
                delete data['keypoint2']
                delete data['keypoint3']
              }
              if (value === 'Sell a product or service') {
                setExtra(true)
              }
              setData({ ...data, [name]: value })
              setErrors({})
            }
            }
            handleSubmit={handleSubmit}
          />
        </section>
      </main>
    </>
  )
}

Brandbrief.propTypes = {
  history: propTypes.object
}

// Brandbrief.propTypes = {
//   history: propTypes.object
// }

export default Brandbrief
