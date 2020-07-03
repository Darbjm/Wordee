import propTypes from 'prop-types'
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useDropzone } from 'react-dropzone'
import { getToken } from '../lib/auth'
import folder from '../../styles/images/folder.svg'

const FileUpload = ({ value, sendUp, reRun }) => {
  const [reject, changeReject] = useState('')
  const [files, setFiles] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {}, [])

  const onDrop = (acceptedFiles, rejectedFiles) => {
    setLoading(true)
    changeReject('')
    if (rejectedFiles[0]) {
      changeReject(rejectedFiles[0].errors[0].message)
    }

    acceptedFiles.map(file => setFiles(prev => [...prev, file]))

    acceptedFiles.map(file => sendUp(file))

    setLoading(false)
  }
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    maxSize: 10000000
  })

  const removeFile = async id => {
    try {
      await axios.delete(`/api/docs/delete/${id}`, {
        headers: { Authorization: `Bearer ${getToken()}` }
      })
      reRun()
    } catch (err) {
      console.log(err.response)
    }
  }

  return (
    <div>
      <div className="space">
        <div className="multiple-images" {...getRootProps()}>
          <input {...getInputProps()} encType="multipart/form-data" />
          {isDragActive ? (
            <p>Drop the files here ...</p>
          ) : (
            <p>Maximum file size 10MB</p>
          )}
        </div>
      </div>
      {loading && <small>Loading...</small>}
      {reject && <small className="is-danger">{reject}</small>}
      <div className="image-container">
        {files &&
          files.map((image, i) => (
            <div className="file-box" key={i}>
              {/* <a
                className="delete"
                // onClick={() => removeImage(image)}
                // onKeyDown={() => removeImage(image)}
                role="button"
                tabIndex={0}
              >
                {' '}
              </a> */}
              <img
                className="brand-imagery"
                key={i}
                src={folder}
                alt={image.name}
              />
              {image.name}
            </div>
          ))}
      </div>
      <div className="image-container">
        {value.docs &&
          value.docs.map((doc, i) => (
            <div className="file-box" key={i}>
              <a
                className="delete"
                onClick={() => removeFile(doc._id, i)}
                onKeyDown={() => removeFile(doc._id, i)}
                role="button"
                tabIndex={-1}
              >
                {' '}
              </a>
              <img
                className="brand-imagery"
                src={folder}
                key={i}
                alt={`${value.title} images`}
              />
              {doc.name}
            </div>
          ))}
      </div>
    </div>
  )
}

FileUpload.propTypes = {
  value: propTypes.object,
  sendUp: propTypes.func,
  reRun: propTypes.func
}

export default FileUpload
