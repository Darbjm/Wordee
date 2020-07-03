import propTypes from 'prop-types'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useDropzone } from 'react-dropzone'
import ImageUpload from '../auth/ImageUpload'
import { getToken, getUser } from '../lib/auth'
import Navbar from '../common/Navbar'
import FileUpload from '../auth/FileUpload'
import { storage } from '../firebase'

const EditProfile = ({ history }) => {
  const [data, setData] = useState({})
  const [errors, setErrors] = useState({})
  const [reject, changeReject] = useState('')
  const [imagery, setImagery] = useState([])
  const [loading, setLoading] = useState(false)
  const [files, setFiles] = useState([])


  const getData = async () => {
    try {
      const res = await axios.get(`/api/brands/${getUser()}`, {
        headers: { Authorization: `Bearer ${getToken()}` }
      })
      setData(res.data)
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    getData()
  }, [])
  

  const onDrop = async (acceptedFiles, rejectedFiles) => {
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
      ).then(response => {
        const images = response.map(info => info.data.url)
        setImagery([...imagery, ...images])
        setLoading(false)
      })
    } catch (err) {
      console.log(err)
    }
  }
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: 'image/jpeg, image/png',
    maxSize: 8000000
  })

  const handleSubmit = async e => {
    e.preventDefault()
    try {
      const newData = {
        username: data.username,
        email: data.email,
        logo: data.logo,
        summary: data.summary,
        blog: data.blog,
        website: data.website
      }
      await axios
        .put(`/api/brands/${getUser()}`, newData, {
          headers: { Authorization: `Bearer ${getToken()}` }
        })
      imagery.map(async image => 
        await axios.post(
          '/api/images/add',
          { url: image },
          {
            headers: { Authorization: `Bearer ${getToken()}` }
          }
        )
      )
      files.map(doc => {
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
                await axios.post(
                  '/api/docs/add',
                  { url: url, name: doc.name },
                  {
                    headers: { Authorization: `Bearer ${getToken()}` }
                  }
                )
              })
          }
        )
      })
      history.push(`profile/${getUser()}`)
    } catch (err) {
      setErrors(err.response.data)
      console.log(err)
    }
  }

  const remove = async e => {
    e.preventDefault()
    try {
      await axios.delete(`/api/brands/${getUser()}`, {
        headers: { Authorization: `Bearer ${getToken()}` }
      })
      history.push('/')
    } catch (err) {
      console.log(err.response.data)
    }
  }

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
    <>
      <Navbar />
      <main className="editprofile">
        <section>
          <div className="column is-6-tablet is-offset-one-quarter is-8-mobile is-offset-2-mobile card">
            <form onSubmit={handleSubmit}>
              <h1 className="center space">Edit Profile</h1>
              <h3>Logo:</h3>
              <div className="space">
                <ImageUpload
                  name="logo"
                  onChange={(name, value) =>
                    setData({ ...data, [name]: value })
                  }
                  className="image-input"
                  value={data.logo}
                />
              </div>
              {/* <h3>Cover Image:</h3>
              <div className="space">
                <ImageUpload
                  name="cover"
                  onChange={(name, value) =>
                    setData({ ...data, [name]: value })
                  }
                  className="image-input"
                  value={data.cover}
                />
              </div> */}
              <div className="space">
                <input
                  className={`input is-rounded ${
                    errors.website ? 'is-danger' : ''
                  }`}
                  placeholder="Website url"
                  name="website"
                  onChange={({ target: { name, value } }) =>
                    setData({ ...data, [name]: value })
                  }
                  value={data.website}
                />
              </div>
              <div className="space">
                <input
                  className={`input is-rounded ${
                    errors.blog ? 'is-danger' : ''
                  }`}
                  placeholder="Blog/ Product url"
                  name="blog"
                  onChange={({ target: { name, value } }) =>
                    setData({ ...data, [name]: value })
                  }
                  value={data.blog}
                />
              </div>
              <div className="space">
                <input
                  className={`input is-rounded ${
                    errors.username ? 'is-danger' : ''
                  }`}
                  placeholder="Brandname"
                  name="username"
                  onChange={({ target: { name, value } }) =>
                    setData({ ...data, [name]: value })
                  }
                  value={data.username}
                />
              </div>
              {errors.username && (
                <small className="help is-danger">{errors.username}</small>
              )}
              <div className="space">
                <input
                  className={`input is-rounded ${
                    errors.email ? 'is-danger' : ''
                  }`}
                  placeholder="Email"
                  name="email"
                  onChange={({ target: { name, value } }) =>
                    setData({ ...data, [name]: value })
                  }
                  value={data.email}
                />
              </div>
              {errors.email && (
                <small className="help is-danger">{errors.email}</small>
              )}
              <div className="space">
                <textarea
                  className={`textarea is-rounded ${
                    errors.summary ? 'is-danger' : ''
                  }`}
                  placeholder="Summary"
                  name="summary"
                  onChange={({ target: { name, value } }) =>
                    setData({ ...data, [name]: value })
                  }
                  value={data.summary || ''}
                />
              </div>
              <h3>Brand Imagery:</h3>
              <div className="space">
                <div className="multiple-images" {...getRootProps()}>
                  <input {...getInputProps()} />
                  {isDragActive ? (
                    <p>Drop the files here ...</p>
                  ) : (
                    <p>Maximum image size 8MB</p>
                  )}
                </div>
              </div>
              {loading && <small>Loading...</small>}
              {reject && <small className="is-danger">{reject}</small>}
              <div className="image-container">
                {imagery &&
                  imagery.map((image, i) => (
                    <div className="image-box" key={i}>
                      <img
                        className="brand-imagery"
                        key={i}
                        src={image}
                        alt={image}
                      />
                      {/* <a
                        className="delete"
                        onClick={() => removeImage(image)}
                        onKeyDown={() => removeImage(image)}
                        role="button"
                        tabIndex={0}
                      >
                        {' '}
                      </a> */}
                    </div>
                  ))}
              </div>
              <div className="image-container">
                {data.image &&
                  data.image.map((img, i) => (
                    <div className="image-box" key={i}>
                      <img
                        className="brand-imagery"
                        src={img.url}
                        key={i}
                        alt={`${data.title} images`}
                      />
                      <a
                        className="delete"
                        onClick={() => removeImage(img._id, i)}
                        onKeyDown={() => removeImage(img._id, i)}
                        role="button"
                        tabIndex={0}
                      >
                        {' '}
                      </a>
                    </div>
                  ))}
              </div>
              <h3>Brand Files:</h3>
              <FileUpload
                reRun={() => getData()}
                name="docs"
                sendUp={(recent) => setFiles(old => [...old, recent])}
                value={data}
                // onChange={() => uploadFiles()}
              />
              <div className="center">
                <button
                  type="submit"
                  className="button is-rounded is-large blue"
                >
                  Edit Brand
                </button>
              </div>
            </form>
          </div>
          <div className="remove">
            <button
              type="button"
              onClick={remove}
              className="button is-rounded is-large"
            >
              Delete Brand
            </button>
          </div>
        </section>
      </main>
    </>
  )
}

EditProfile.propTypes = {
  history: propTypes.object
}

export default EditProfile
