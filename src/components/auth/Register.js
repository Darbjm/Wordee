import React from 'react'
import axios from 'axios'
import Select from 'react-select'

class Register extends React.Component {
  state = {
    data: {
      name: '',
      email: '',
      password: '',
      passwordConfirmation: '',
      skills: ''
    },
    errors: {}
  }

  options = [
    { value: 'african', label: 'African' },
    { value: 'caribbean', label: 'Caribbean' },
    { value: 'chinese', label: 'Chinese' },
    { value: 'french', label: 'French' },
    { value: 'greek', label: 'Greek' },
    { value: 'indian', label: 'Indian' },
    { value: 'italian', label: 'Italian' },
    { value: 'japanese', label: 'Japanese' },
    { value: 'korean', label: 'Korean' },
    { value: 'mexican', label: 'Mexican' },
    { value: 'moroccan', label: 'Moroccan' },
    { value: 'south-east-asian', label: 'South-East Asian' },
    { value: 'turkish/middle-eastern', label: 'Turkish/Middle-Eastern' },
    { value: 'vegan', label: 'Vegan' },
    { value: 'vegetarian', label: 'Vegetarian' }
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
      console.log('hey man')
      await axios.post('http://localhost:8000/register', this.state.data)
      this.props.history.push('/chefs')
    } catch (err) {
      // console.log(err.response.data.errors) //Specific only to this API
      this.setState({ errors: err.response.data.errors })
    }
  }

  render() {
    return (
      <section className="userSection">
        <form onSubmit={this.handleSubmit} className="userContainer">
          <div className="userInfo">
            <h2 className="title">Register</h2>
            <div className="field">
              <label className="label">NAME</label>
              <div className="control">
                <input
                  className={`input ${this.state.errors.name ? 'is-danger' : ''}`}
                  placeholder="Name"
                  name="name"
                  onChange={this.handleChange}
                />
              </div>
              {this.state.errors.name && <small className="help is-danger">{this.state.errors.name}</small>}
            </div>
            <div className="field">
              <label className="label">EMAIL</label>
              <div className="control">
                <input
                  className={`input ${this.state.errors.email ? 'is-danger' : ''}`}
                  placeholder="Email"
                  name="email"
                  onChange={this.handleChange}
                />
              </div>
              {this.state.errors.email && <small className="help is-danger">{this.state.errors.email}</small>}
            </div>
            <div className="field">
              <label className="label">PASSWORD</label>
              <div className="control">
                <input
                  className={`input ${this.state.errors.password ? 'is-danger' : ''}`}
                  type="password"
                  placeholder="Password"
                  name="password"
                  onChange={this.handleChange}
                />
              </div>
              {this.state.errors.password && <small className="help is-danger">{this.state.errors.password}</small>}
            </div>
            <div className="field">
              <label className="label">PASSWORD CONFIRMATION</label>
              <div className="control">
                <input
                  className={`input ${this.state.errors.passwordConfirmation ? 'is-danger' : ''}`}
                  type="password"
                  placeholder="Password Confirmation"
                  name="passwordConfirmation"
                  onChange={this.handleChange}
                />
              </div>
              {this.state.errors.passwordConfirmation && <small className="help is-danger">{this.state.errors.passwordConfirmation}</small>}
            </div>
          </div>
          <div className="userImage">
            <figure className="imageContainer">
              <img className="image" src='https://www.stleos.uq.edu.au/wp-content/uploads/2016/08/image-placeholder-350x350.png' alt='Placeholder image' />
            </figure>
            <hr />
            <button className="button is-primary">SAVE</button>
          </div>
          <div className="skills-recipes">
            <label className="label">What are your skills?</label>
            <div className="control">
              <Select
                options={this.options}
                isMulti
                onChange={this.handleMultiChange}
              />
            </div>
          </div>
        </form>
      </section>
    )
  }
}

export default Register