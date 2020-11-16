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
      const briefData = {
        query: `
        query {
        singleBrief(briefId: "${id}"){
          _id
          title
          content
          length
          level
          purpose
          prodName
          new
          keypoints
          message
          url
          first_draft
          topic
          keyword1
          keyword2
          keyword3
        }
      }
        `
      }
      try {
        const { data: { data: { singleBrief }}} = await axios.post('http://localhost:4000/graphql', briefData, {
          headers: { Authorization: `Bearer ${getToken()}` }
        })
        if (singleBrief.purpose === 'Sell a product or service') setExtraQuestions(true)
        setData(singleBrief)
      } catch (err) {
        console.log(err)
      }
    }
    getData()
  }, [id])

  /**Upload Brief */
  const handleSubmit = async e => {
    e.preventDefault()
    const noExtraQuestions = {
      ...data
    }
    if (noExtraQuestions.purpose !== 'Sell a product or service') {
      delete noExtraQuestions['prodName']
      delete noExtraQuestions['new']
      delete noExtraQuestions['keypoints']
    }
    try {
      const keys = Object.keys(noExtraQuestions)
      const vals = Object.values(noExtraQuestions)
      const newError = {}
      vals.forEach((value, i) => {
        if (value === '') {
          newError[keys[i]] = 'Please complete all sections' 
        }
      })
      setErrors(newError)
      if (Object.keys(newError).length > 0) return
      const briefData = {
        query: `
        mutation {
          editBrief(briefInput: {
            _id: "${id}",
            title: "${data.title}",
            content: "${data.content}",
            length: "${data.length}",
            level: "${data.level}",
            purpose: "${data.purpose}",
            prodName: "${data.prodName}",
            new: "${data.new}",
            keypoints: "${data.keypoints}",
            message: "${data.message}",
            url: "${data.url}",
            first_draft: "${data.first_draft}",
            topic: "${data.topic}",
            keyword1: "${data.keyword1}",
            keyword2: "${data.keyword2}",
            keyword3: "${data.keyword3}",
          }){
            _id
            title
          }
        }
        `
      }
      await axios.post('http://localhost:4000/graphql', briefData, {
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
    const deleteBrief = {
      query: `
      mutation {
        deleteBrief(briefId: "${id}"){
          _id
        }
      }
      `
    }
    try {
      await axios.post('http://localhost:4000/graphql', deleteBrief, {
        headers: { Authorization: `Bearer ${getToken()}` }
      })
      // history.push(`/profile/${getUser()}`)
    } catch (err) {
      console.log(err.response)
    }
  }

  /**Add extra questions to the brief form */
  const addExtraQuestions = (event) => {
    event.persist()
    const { name, value } = event.target
    if (name === 'purpose') setExtraQuestions(false)
    if (value === 'Sell a product or service') {
      setExtraQuestions(true)
    }
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
