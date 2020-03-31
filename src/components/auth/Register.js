
import React from 'react'
import axios from 'axios'
import Select from 'react-select'
import ImageUpload from '../ImageUpload'


class Register extends React.Component {
  state = {
    data: {
      name: '',
      email: '',
      password: '',
      passwordConfirmation: '',
      skills: '',
      city: '',
      postcode: '',
      image: ''
    },
    errors: {}
  }

  options = [
    { value: 'African', label: 'African' },
    { value: 'Caribbean', label: 'Caribbean' },
    { value: 'Chinese', label: 'Chinese' },
    { value: 'French', label: 'French' },
    { value: 'Greek', label: 'Greek' },
    { value: 'Indian', label: 'Indian' },
    { value: 'Italian', label: 'Italian' },
    { value: 'Japanese', label: 'Japanese' },
    { value: 'Korean', label: 'Korean' },
    { value: 'Mexican', label: 'Mexican' },
    { value: 'Moroccan', label: 'Moroccan' },
    { value: 'South-East Asian', label: 'South-East Asian' },
    { value: 'Turkish/Middle-Eastern', label: 'Turkish/Middle-Eastern' },
    { value: 'Vegan', label: 'Vegan' },
    { value: 'Vegetarian', label: 'Vegetarian' }
  ]

  handleChange = e => {
    const data = { ...this.state.data, [e.target.name]: e.target.value }
    const errors = { ...this.state.errors, [e.target.name]: '' }
    this.setState({ data, errors })
  }

  handleMultiChange = (selected) => {
    const skills = selected ? selected.map(item => item.value) : []
    const data = { ...this.state.data, skills }
    this.setState({ data })
  }

  handleSubmit = async e => {
    e.preventDefault()
    console.log('submitting', this.state.data)
    try {
      await axios.post('/api/register', this.state.data)
      this.props.history.push('/login')
    } catch (err) {
      this.setState({ errors: err.response.data.errors })
    }
  }

  render() {
    return (
      <section className='user-section'>
        <form onSubmit={this.handleSubmit} className='user-container'>
          <div className='user-info'>
            <h2 className='title'>Register</h2>
            <br />
            <div className='fieldContainer'>
              <div className='field'>
                <label className='label'>NAME</label>
                <div className='control'>
                  <input
                    className={`input is-rounded ${this.state.errors.name ? 'is-danger' : ''}`}
                    placeholder='Name'
                    name='name'
                    onChange={this.handleChange}
                  />
                </div>
                {this.state.errors.name && <small className='help is-danger'>{this.state.errors.name}</small>}
              </div>
              <div className='field'>
                <label className='label'>EMAIL</label>
                <div className='control'>

                  <input
                    className={`input is-rounded ${this.state.errors.email ? 'is-danger' : ''}`}
                    placeholder='Email'
                    name='email'
                    onChange={this.handleChange}
                  />
                </div>
                {this.state.errors.email && <small className='help is-danger'>{this.state.errors.email}</small>}
              </div>
              <div className='field'>
                <label className='label'>PASSWORD</label>
                <div className='control'>
                  <input
                    className={`input is-rounded ${this.state.errors.password ? 'is-danger' : ''}`}
                    type='password'
                    placeholder='Password'
                    name='password'
                    onChange={this.handleChange}
                  />
                </div>
                {this.state.errors.password && <small className='help is-danger'>{this.state.errors.password}</small>}
              </div>
              <div className='field'>
                <label className='label'>PASSWORD CONFIRMATION</label>
                <div className='control'>
                  <input
                    className={`input is-rounded ${this.state.errors.passwordConfirmation ? 'is-danger' : ''}`}
                    type='password'
                    placeholder='Password Confirmation'
                    name='passwordConfirmation'
                    onChange={this.handleChange}
                  />
                </div>
                {this.state.errors.passwordConfirmation && <small className='help is-danger'>{this.state.errors.passwordConfirmation}</small>}
              </div>
            </div>
          </div>
          <div className='user-image'>
            <ImageUpload
              handleChange={this.handleChange}
              fieldName='image'
              inputClassName='my-input-class'
            />
            <hr />
            <button type='submit' className='button is-rounded  is-primary'>SAVE</button>
          </div>
          <div className='skills-recipes'>
            <div className='fieldContainer'>
              <label className='label'>What are your skills?</label>
              <div className='control'>
                <Select
                  options={this.options}
                  isMulti
                  onChange={this.handleMultiChange}
                />
              </div>
              <div className='field'>
                <label className='label'>CITY</label>
                <div className='control'>
                  <input
                    className={`input ${this.state.errors.city ? 'is-danger' : ''}`}
                    placeholder='City'
                    name='city'
                    onChange={this.handleChange}
                  />
                </div>
                {this.state.errors.city && <small className='help is-danger'>{this.state.errors.city}</small>}
              </div>
              <div className='field'>
                <label className='label'>POSTCODE</label>
                <div className='control'>
                  <input
                    className={`input ${this.state.errors.postcode ? 'is-danger' : ''}`}
                    placeholder='Postcode'
                    name='postcode'
                    onChange={this.handleChange}
                  />
                </div>
                {this.state.errors.postcode && <small className='help is-danger'>{this.state.errors.postcode}</small>}
              </div>
            </div>
          </div>
        </form>
      </section>
    )
  }
}

export default Register