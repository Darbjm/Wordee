import React from 'react'
import axios from 'axios'
import Auth from '../../lib/auth'
import UserForm from './UserForm'


class UserEdit extends React.Component {
  state = {
    data: {
      name: '',
      email: '',
      image: '',
      skills: '',
      city: '',
      postcode: ''
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

  async componentDidMount() {
    const UserId = this.props.match.params.id
    try {
      const res = await axios.get(`/api/chefs/${UserId}`, {
        headers: { Authorization: `Bearer ${Auth.getToken()}` }
      })
      this.setState({ data: res.data })
    } catch (err) {
      console.log('something is wrong', err)
    }
  }

  handleMultiChange = (selected) => {
    const skills = selected ? selected.map(item => item.value) : []
    const data = { ...this.state.data, skills }
    this.setState({ data })
  }

  handleChange = ({ target: { name, value, image } }) => {
    const data = { ...this.state.data, [name]: value, [image]: value }
    this.setState({ data })
  }

  handleSubmit = async (e) => {
    e.preventDefault()
    console.log(this.props.match.params.id)
    const userId = this.props.match.params.id
    try {
      await axios.put(`/api/chefs/${userId}`, this.state.data, {
        headers: { Authorization: `Bearer ${Auth.getToken()}` }
      })
      this.props.history.push('/profile')
    } catch (err) {
      this.setState(err.response.data.errors)
    }
  }

  handleDelete = async () => {
    const chefId = this.props.match.params.id
    try {
      await axios.delete(`/api/chefs/${chefId}`, {
        headers: { Authorization: `Bearer ${Auth.getToken()}` }
      })
      this.props.history.push('/')
    } catch (err) {
      console.log(err.response)
    }
  }

  render() {
    if (!this.state.data.name) return null
    return (
      <UserForm
        data={this.state.data}
        handleChange={this.handleChange}
        handleSubmit={this.handleSubmit}
        handleDelete={this.handleDelete}
        errors={this.state.errors}
        options={this.options}
        handleMultiChange={this.handleMultiChange}
      />
    )
  }
}


export default UserEdit