import propTypes from 'prop-types'
import React, { useState } from 'react'
import axios from 'axios'
import { useDropzone } from 'react-dropzone'
import { getToken } from '../lib/auth'
import { storage } from '../firebase'
import folder from '../../styles/images/folder.svg'

/**Component for uploading and displaying the brands files*/
const BrandFiles = ({ user, getData }) => {
  const [reject, changeReject] = useState('')
  const [loading, setLoading] = useState(false)

  /**Upload new files to user */
  const onDrop = (acceptedFiles, rejectedFiles) => {
    try {
      setLoading(true)
      changeReject('')
      if (rejectedFiles[0]) {
        changeReject(rejectedFiles[0].errors[0].message)
      }
      Promise.all(
        acceptedFiles.map(doc => {
          const uploadTask = storage.ref(`files/${doc.name}`).put(doc)
          uploadTask.on(
            'state_changed',
            snapshot => {
              console.log(snapshot)
            },
            error => {
              console.log(error)
            },
            () => {
              storage
                .ref('files')
                .child(doc.name)
                .getDownloadURL()
                .then(async (url) => {
                  console.log(url)
                  await axios.post(
                    '/api/docs/add',
                    { url: url, name: doc.name },
                    {
                      headers: { Authorization: `Bearer ${getToken()}` }
                    }
                  )
                })
                .then(() => {
                  setLoading(false)
                  getData()
                })
            }
          )
        }))
    } catch (err) {
      console.log(err)
    }
  }

  /**React-dropzone settings */
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    maxSize: 10000000
  })

  /**Delete file */
  const removeFile = async id => {
    try {
      await axios.delete(`/api/docs/delete/${id}`, {
        headers: { Authorization: `Bearer ${getToken()}` }
      })
      getData()
    } catch (err) {
      console.log(err.response)
    }
  }

  return (
    <div>
      <h2>
        Share files:
      </h2>
      <div className="row">
        <div className="multiple-images" {...getRootProps()}>
          <input {...getInputProps()} encType="multipart/form-data" />
          {isDragActive ? (
            <p>Drop the files here ...</p>
          ) : (
            <p>Maximum file size 10MB</p>
          )}
        </div>
        <div className="file-container">
          {user.docs &&
          user.docs.map(file => (
            <div className="image-box" key={file._id}>
              <a
                rel="noopener noreferrer"
                target="_blank"
                href={file.url}
                
              >
                <img
                  className="brand-files"
                  src={folder}
                  alt={`${file.name} images`}
                />
              </a>
              <a
                className="delete"
                onClick={() => removeFile(file._id)}
                onKeyDown={() => removeFile(file._id)}
                role="button"
                tabIndex={1}
              >
                {' '}
              </a>
              {file.name}
            </div>
          ))}
        </div>
      </div>
      {loading && <small>Loading...</small>}
      {reject && <small className="is-danger">{reject}</small>}
    </div>
  )
}

BrandFiles.propTypes = {
  user: propTypes.object,
  getData: propTypes.func
}

export default BrandFiles
