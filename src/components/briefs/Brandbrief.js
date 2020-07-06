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
          <BriefForm
            header="Create Brief"
            data={data}
            errors={errors}
            handleChange={({ target: { name, value } }) => {
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
