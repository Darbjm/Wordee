import propTypes from 'prop-types'
import React, { useState } from 'react'
import axios from 'axios'
import { getToken, getUser } from '../lib/auth'
import BriefForm from './BriefForm'
import Navbar from '../common/Navbar'

/**Enum for extra questions */
const EXTRAQUESTIONS = {
  PRODNAME: 'prodName',
  NEW: 'new',
  KEYPOINTS: 'keypoints'
}

/**Component for creating brand brief */
const Brandbrief = ({ history }) => {
  const [data, setData] = useState({
    title: '',
    content: '',
    length: '',
    level: '',
    purpose: '',
    prodName: '',
    new: '',
    keypoints: '',
    message: '',
    url: '',
    first_draft: '',
    topic: '',
    keyword1: '',
    keyword2: '',
    keyword3: ''
  })
  const [errors, setErrors] = useState({})
  const [extraQuestions, setExtraQuestions] = useState(false)

  /**Upload new brief */
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

  /**Add extra questions to the brief form */
  const addExtraQuestions = (event) => {
    event.persist()
    const { name, value } = event.target
    //if the user does not want to sell a product or service remove extra questions
    if (name === 'purpose' && value !== 'Sell a product or service') {
      setExtraQuestions(false)
      const newData = { ...data }
      delete newData[EXTRAQUESTIONS.PRODNAME]
      delete newData[EXTRAQUESTIONS.NEW]
      delete newData[EXTRAQUESTIONS.KEYPOINTS]
      setData(newData)
    }
    // if the user does want to sell a product or service add extra questions
    if (value === 'Sell a product or service') {
      setExtraQuestions(true)
      setData({ ...data, 
        [EXTRAQUESTIONS.PRODNAME]: '',
        [EXTRAQUESTIONS.NEW]: '',
        [EXTRAQUESTIONS.KEYPOINTS]: ''
      })
    }
    setData({ ...data, [name]: value })
    setErrors({})
  }

  return (
    <>
      <Navbar />
      <main>
        <section className="createbrief">
          <BriefForm
            header="Create Brief"
            type="Create Brief"
            data={data}
            errors={errors}
            extraQuestions={extraQuestions}
            handleChange={(event) => addExtraQuestions(event)}
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
