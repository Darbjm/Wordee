import propTypes from 'prop-types'
import React, { useState } from 'react'
import axios from 'axios'

const ImageUpload = ({ value, onChange, name }) => {
  const [logo, setLogo] = useState(value)

  const handleUpload = async ({ target: { files } }) => {
    const data = new FormData()
    data.append('file', files[0])
    console.log(process.env)
    data.append('upload_preset', process.env.REACT_APP_CLOUDINARY_LOGOS)
    const res = await axios.post(process.env.REACT_APP_CLOUDINARY_URL, data)
    console.log(res)
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
      {logo || value ? '' : <p>Please use .jpg or .png under 700 x 700</p>}
      <input type="file" onChange={handleUpload} />
    </div>
  )
}

ImageUpload.propTypes = {
  value: propTypes.string,
  onChange: propTypes.func.isRequired,
  name: propTypes.string.isRequired
}

export default ImageUpload
