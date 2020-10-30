import propTypes from 'prop-types'
import React, { useState } from 'react'
import axios from 'axios'
import { getToken, getUser } from '../lib/auth'
import { useDropzone } from 'react-dropzone'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenSquare } from '@fortawesome/free-solid-svg-icons'

const BrandCover = ({ user, getData }) => {
  const [reject, changeReject] = useState('')
  const [loading, setLoading] = useState(false)

  /**Upload new cover photo to user */
  const onDrop = async (acceptedFiles, rejectedFiles) => {
    try {
      setLoading(true)
      changeReject('')
      if (rejectedFiles[0]) {
        changeReject(rejectedFiles[0].errors[0].message)
      }
      const data = new FormData()
      data.append('file', acceptedFiles[0])
      data.append('upload_preset', process.env.REACT_APP_cloudlogos)
      const res = await axios.post(process.env.REACT_APP_url, data)
      const newData = {
        cover: res.data.url
      }
      await axios
        .put(`/api/brands/${getUser()}`, newData, {
          headers: { Authorization: `Bearer ${getToken()}` }
        }).then(() => {
          getData()
          setLoading(false)
        })
    } catch (err) {
      console.log(err)
    }
  }

  /** React-dropzone settings */
  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: 'image/jpeg, image/png',
    maxSize: 8000000
  })

  return (
    <div>
      {user.cover ? (
        <div className="user-cover">
          {reject && <small className="is-danger">{reject}</small>}
          <div {...getRootProps()} className="edit">
            <input {...getInputProps()} />
            {/* Turn loading into a spinner */}
            {loading ? <small>Loading...</small> : <FontAwesomeIcon icon={faPenSquare} size="2x" style={{ position: 'absolute' }}/>}
          </div>
          <img src={user.cover} alt="Logo" />
        </div>
      ) : (
        <div {...getRootProps()} className="user-cover empty">
          <input {...getInputProps()} />
          <FontAwesomeIcon icon={faPenSquare} size="2x" className="space"/>
          <h2>Add cover photo</h2>
        </div>
      )}
      <br />
    </div>
  )
}

propTypes.BrandCover = {
  user: propTypes.object,
  getData: propTypes.func
}

export default BrandCover