import propTypes from 'prop-types'
import React, { useState } from 'react'
import axios from 'axios'
import { getToken, getUser } from '../lib/auth'
import BriefForm from './BriefForm'
import Navbar from '../common/Navbar'

const Brandbrief = ({ history }) => {
  const [data, setData] = useState({})
  const [errors, setErrors] = useState({})

  const handleSubmit = async e => {
    e.preventDefault()
    try {
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
            handleChange={({ target: { name, value } }) =>
              setData({ ...data, [name]: value })
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

export default Brandbrief
