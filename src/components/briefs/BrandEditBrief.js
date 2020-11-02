import propTypes from 'prop-types'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { getToken, getUser } from '../lib/auth'
import BriefForm from './BriefForm'
import Navbar from '../common/Navbar'

/**Component to edit brief */
const BrandEditBrief = ({
  history,
  match: {
    params: { id }
  }
}) => {
  const [data, setData] = useState({})
  const [errors, setErrors] = useState({})
  const [extraQuestions, setExtraQuestions] = useState(false)

  useEffect(() => {
    const getData = async () => {
      try {
        const res = await axios.get(`/api/briefs/${id}`, {
          headers: { Authorization: `Bearer ${getToken()}` }
        })
        if (res.data.purpose === 'Sell a product or service') setExtraQuestions(true)
        setData(res.data)
      } catch (err) {
        console.log(err)
      }
    }
    getData()
  }, [id])

  /**Upload Brief */
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
      await axios.put(`/api/briefs/${id}`, data, {
        headers: { Authorization: `Bearer ${getToken()}` }
      })
      history.push(`/profile/${getUser()}`)
    } catch (err) {
      setErrors(err.response.data)
    }
  }

  /**Delete Brief */
  const remove = async e => {
    e.preventDefault()
    try {
      await axios.delete(`/api/briefs/${id}`, {
        headers: { Authorization: `Bearer ${getToken()}` }
      })
      history.push(`/profile/${getUser()}`)
    } catch (err) {
      console.log(err.response)
    }
  }

  /**Add extra questions to the brief form */
  const addExtraQuestions = (event) => {
    event.persist()
    const { name, value } = event.target
    if (name === 'purpose') setExtraQuestions(false)
    if (value === 'Sell a product or service') setExtraQuestions(true)
    setData({ ...data, [name]: value })
    setErrors({})
  }

  return (
    <>
      <Navbar />
      <main className="editbrief">
        <section>
          <BriefForm
            header="Edit Brief"
            type="Save Brief"
            data={data}
            errors={errors}
            extraQuestions={extraQuestions}
            handleChange={(event) => addExtraQuestions(event)}
            handleSubmit={handleSubmit}
          />
        </section>
        <div className="remove">
          <button
            type="button"
            onClick={remove}
            className="button is-large is-rounded"
          >
            Delete Brief
          </button>
        </div>
      </main>
    </>
  )
}

BrandEditBrief.propTypes = {
  history: propTypes.object,
  match: propTypes.shape({
    params: propTypes.shape({
      id: propTypes.string
    })
  })
}

export default BrandEditBrief
