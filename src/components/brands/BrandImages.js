import React, { useState } from 'react'
import propTypes from 'prop-types'
import axios from 'axios'
import { useDropzone } from 'react-dropzone'
import { getToken } from '../lib/auth'

/**Component for uploading and displaying the brands images*/
const BrandImages = ({ user, getData }) => {
  const [reject, changeReject] = useState('')
  const [loading, setLoading] = useState(false)

  /**Upload new images to user */
  const onDrop = (acceptedFiles, rejectedFiles) => {
    try {
      setLoading(true)
      changeReject('')
      if (rejectedFiles[0]) {
        changeReject(rejectedFiles[0].errors[0].message)
      }
      Promise.all(
        acceptedFiles.map(image => {
          const formData = new FormData()
          formData.append('file', image)
          formData.append(
            'upload_preset',
            process.env.REACT_APP_cloudimage
          )
          return axios.post(process.env.REACT_APP_url, formData)
        })
      ).then(async response => {
        const imagery = response.map(info => info.data.url)
        imagery.map(async image => 
          await axios.post(
            '/api/images/add',
            { url: image },
            {
              headers: { Authorization: `Bearer ${getToken()}` }
            }
          )
        )
      }).then(() => {
        setLoading(false)
        getData()
      })
    } catch (err) {
      console.log(err)
    }
  }

  /**React-dropzone settings */
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: 'image/jpeg, image/png',
    maxSize: 8000000
  })

  /**Remove image */
  const removeImage = async id => {
    try {
      await axios.delete(`/api/images/delete/${id}`, {
        headers: { Authorization: `Bearer ${getToken()}` }
      })
      getData()
    } catch (err) {
      console.log(err.response.data)
    }
  }

  return (
    <div>
      <h2>Share imagery:</h2>
      <div className='row'>
        <div className="multiple-images" {...getRootProps()}>
          <input {...getInputProps()} />
          {isDragActive ? (
            <p>Drop the images here ...</p>
          ) : (
            <p>Maximum image size 8MB</p>
          )}
        </div>
        <div className="image-container">
          {user.image &&
          user.image.map(img => (
            <div className="image-box" key={img.url}>
              <img
                className="brand-imagery"
                src={img.url}
                alt={`${user.title} images`}
              />
              <a
                className="delete"
                onClick={() => removeImage(img._id)}
                onKeyDown={() => removeImage(img._id)}
                role="button"
                tabIndex={0}
              >
                {' '}
              </a>
            </div>
          ))}
        </div>
      </div>
      {loading && <small>Loading...</small>}
      {reject && <small className="is-danger">{reject}</small>}
    </div>
  )
}

BrandImages.propTypes = {
  user: propTypes.object,
  getData: propTypes.func
}

export default BrandImages