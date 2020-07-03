import propTypes from 'prop-types'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { getToken, getUser } from '../lib/auth'
import BriefForm from './BriefForm'
import Navbar from '../common/Navbar'

const BrandEditBrief = ({
  history,
  match: {
    params: { id }
  }
}) => {
  const [data, setData] = useState({})
  const [errors, setErrors] = useState({})

  useEffect(() => {
    const getData = async () => {
      try {
        const res = await axios.get(`/api/briefs/${id}`, {
          headers: { Authorization: `Bearer ${getToken()}` }
        })
        setData(res.data)
      } catch (err) {
        console.log(err)
      }
    }
    getData()
  }, [id])

  const handleSubmit = async e => {
    e.preventDefault()
    try {
      await axios.put(`/api/briefs/${id}`, data, {
        headers: { Authorization: `Bearer ${getToken()}` }
      })
      history.push(`/profile/${getUser()}`)
    } catch (err) {
      setErrors(err.response.data)
    }
  }

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

  return (
    <>
      <Navbar />
      <main className="editbrief">
        <section>
          <BriefForm
            header="Edit Brief"
            data={data}
            errors={errors}
            handleChange={({ target: { name, value } }) =>
              setData({ ...data, [name]: value })
            }
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
