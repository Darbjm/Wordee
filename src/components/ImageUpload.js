import React from 'react'
import axios from 'axios'

class ImageUpload extends React.Component {
  state = {
    image: null,
    selectedImage: null 
  }

  handleUpload = async ({ target: { files } }) => {
    const data = new FormData
    data.append('file', files[0])
    data.append('upload_preset', 'afar9d6z')
    const res = await axios.post('https://api.cloudinary.com/v1_1/dqrkw1z1a/image/upload', data)
    this.setState({ image: res.data.url }, () => {
      console.log('hi')
      this.props.handleChange({ target: { name: this.props.fieldName, value: res.data.url } })
      console.log(this.props)
    })
  }

  render() {
    const labelClass = this.props.labelClassName ? this.props.labelClassName : 'default_class'
    const { image } = this.state
    return (
      <>
        {image ?      
          <div>
            <img src={image} />
          </div>
          :
          <>
            <label className={labelClass}>{this.props.labelText}</label>
            <input
              className={this.props.inputClassName}
              type='file'
              onChange={this.handleUpload}
            />
          </>
        }
      </>
    )
  }
}

export default ImageUpload