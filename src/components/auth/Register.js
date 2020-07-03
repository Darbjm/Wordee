import propTypes from 'prop-types'
import React, { useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import logo from '../../styles/images/Wordee.svg'

const Register = ({ history }) => {
  const [data, setData] = useState({})
  const [error, setError] = useState('')
  // const [user, setUser] = useState(true);

  const handleChange = ({ target: { name, value } }) =>
    setData({ ...data, [name]: value })

  // const handleUser = value => setUser(value);

  const handleSubmit = async e => {
    e.preventDefault()
    // const address = user ? 'brands' : 'writers';
    try {
      const res = await axios.post('/api/brands/register', data)
      console.log(res)
      history.push('/')
    } catch (err) {
      console.log(err.response)
      setError(err.response.data)
    }
  }

  return (
    <main>
      <section className="register">
        <div className="column is-6-tablet is-offset-one-quarter is-8-mobile is-offset-2-mobile card">
          <form
            onSubmit={handleSubmit}
            className="has-text-centered is-centered"
          >
            <img src={logo} alt="Wordee Logo" />
            <div className="field">
              {/* <div className="oneline">
                <h2 className="label">Register as a:</h2>
                <label className="radio" htmlFor="brandradio">
                  <input
                    id="brandradio"
                    name="user"
                    type="radio"
                    value="brand"
                    onChange={() => handleUser(true)}
                    checked={user === true}
                  />
                  Brand
                </label>
                <label className="radio" htmlFor="userradio">
                  <input
                    id="userradio"
                    name="user"
                    type="radio"
                    value="writer"
                    onChange={() => handleUser(false)}
                    checked={user === false}
                  />
                  Writer
                </label>
              </div> */}
              <div className="fieldContainer">
                <div className="field">
                  <div className="control">
                    <input
                      className={`input is-large is-rounded ${
                        error.username ? 'is-danger' : ''
                      }`}
                      placeholder="Brandname"
                      name="username"
                      onChange={handleChange}
                    />
                  </div>
                  {error.username && (
                    <small className="help is-danger">{error.username}</small>
                  )}
                </div>
                <div className="field">
                  <div className="control">
                    <input
                      className={`input is-large is-rounded ${
                        error.email ? 'is-danger' : ''
                      }`}
                      placeholder="Email"
                      name="email"
                      onChange={handleChange}
                    />
                  </div>
                  {error.email && (
                    <small className="help is-danger">{error.email}</small>
                  )}
                </div>
                <div className="field">
                  <div className="control">
                    <input
                      className={`input is-large is-rounded ${
                        error.password ? 'is-danger' : ''
                      }`}
                      type="password"
                      placeholder="Password"
                      name="password"
                      onChange={handleChange}
                    />
                  </div>
                  {error.password && (
                    <small className="help is-danger">{error.password}</small>
                  )}
                </div>
                <div className="field">
                  <div className="control">
                    <input
                      className={`input is-large is-rounded ${
                        error.password_confirmation ? 'is-danger' : ''
                      }`}
                      type="password"
                      placeholder="Password Confirmation"
                      name="password_confirmation"
                      onChange={handleChange}
                    />
                  </div>
                  {error.password_confirmation && (
                    <small className="help is-danger">
                      {error.password_confirmation}
                    </small>
                  )}
                </div>
                <button type="submit" className="button is-rounded is-large">
                  Register Brand
                </button>
              </div>
            </div>
            <div className="log">
              Already have an account? <Link to="/">Login</Link>
            </div>
          </form>
        </div>
      </section>
    </main>
  )
}

Register.propTypes = {
  history: propTypes.object
}

export default Register
