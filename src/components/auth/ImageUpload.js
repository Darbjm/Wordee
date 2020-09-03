import propTypes from 'prop-types'
import React, { useState } from 'react'
import axios from 'axios'

const ImageUpload = ({ value, onChange, name, size }) => {
  const [logo, setLogo] = useState(value)

  const handleUpload = async ({ target: { files } }) => {
    const data = new FormData()
    data.append('file', files[0])
    data.append('upload_preset', process.env.REACT_APP_cloudlogos)
    const res = await axios.post(process.env.REACT_APP_url, data)
    setLogo(res.data.url)
    onChange(name, res.data.url)
  }

  return (
    <div className="is-row image-input">
      {value ? (
        <div>
          <img src={value} alt={value} className="upload-image" />
        </div>
      ) : (
        logo && (
          <div>
            <img src={logo} alt={logo} className="upload-image" />
          </div>
        )
      )}
      {logo || value ? '' : <p>{size}</p>}
      <input type="file" onChange={handleUpload} />
    </div>
  )
}

ImageUpload.propTypes = {
  value: propTypes.string,
  onChange: propTypes.func.isRequired,
  name: propTypes.string.isRequired,
  size: propTypes.string.isRequired
}

export default ImageUpload
