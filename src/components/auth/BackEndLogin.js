import propTypes from 'prop-types'
import React, { useState } from 'react'
import axios from 'axios'
import { setToken } from '../lib/auth'
import logo from '../../styles/images/Wordee.svg'

/**Component to render login for backend */
const BackEndLogin = ({ history }) => {
  const [data, setData] = useState({})
  const [error, setError] = useState('')

  /**Change data in state */
  const handleChange = ({ target: { name, value } }) =>
    setData({ ...data, [name]: value })

  /**Submit data for login on backend */
  const handleSubmit = async e => {
    e.preventDefault()
    try {
      const {
        data: { token }
      } = await axios.post('/api/admin/login', data)
      setToken(token)
      history.push('/backendtesting5702918301')
    } catch (err) {
      setError('Invalid Credentials')
    }
  }

  return (
    <main>
      <section className="login">
        <div className="column is-6-tablet is-offset-one-quarter is-8-mobile is-offset-2-mobile">
          <form
            onSubmit={handleSubmit}
            className="has-text-centered is-centered"
          >
            <img src={logo} alt="Wordee Logo" />
            <h1>ADMIN</h1>
            <hr />
            <div className="field">
              <div className="control">
                <input
                  className={`input is-rounded is-large ${
                    error ? 'is-danger' : ''
                  }`}
                  name="email"
                  placeholder="Email"
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="field">
              <br></br>
              <div className="control">
                <input
                  className={`input is-rounded is-large ${
                    error ? 'is-danger' : ''
                  }`}
                  type="password"
                  name="password"
                  placeholder="Password"
                  onChange={handleChange}
                />
              </div>
              <div className="invalid">
                <small className="is-danger">{error}</small>
              </div>
              <button type="submit" className="button is-rounded is-large">
                Admin Login
              </button>
            </div>
          </form>
        </div>
      </section>
    </main>
  )
}

BackEndLogin.propTypes = {
  history: propTypes.object
}

export default BackEndLogin
