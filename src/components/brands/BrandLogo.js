import propTypes from 'prop-types'
import React, { useState } from 'react'
import axios from 'axios'
import { getToken, getUser } from '../lib/auth'
import { useDropzone } from 'react-dropzone'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenSquare } from '@fortawesome/free-solid-svg-icons'

/**Component to display and upload brand logo */
const BrandLogo = ({ user, getData }) => {
  const [reject, changeReject] = useState('')
  const [loading, setLoading] = useState(false)

  /**Upload new logo to user */
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
        logo: res.data.url
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
      {user.logo ? (
        <div className="position-bottom">
          <div {...getRootProps()} className="logo">
            <input {...getInputProps()} />
            <FontAwesomeIcon icon={faPenSquare} size='1x' style={{ position: 'absolute' }}/>
          </div>
          <img className="profile-logo" src={user.logo} alt="Logo" />
        </div>
      ) : (
        <div className="logo-circle logo" {...getRootProps()}>
          <input {...getInputProps()} />
          <FontAwesomeIcon icon={faPenSquare} size='2x' className="space"/>
          <h2>Add Logo</h2>
        </div>
      )}
      <br />
      {loading && <small>Loading...</small>}
      {reject && <small className="is-danger">{reject}</small>}
    </div>
  )
}

propTypes.BrandLogo = {
  user: propTypes.object,
  getData: propTypes.func
}

export default BrandLogo