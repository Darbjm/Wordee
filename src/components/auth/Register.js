import propTypes from 'prop-types'
import React, { useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import logo from '../../styles/images/Wordee.svg'

const Register = ({ history }) => {
  const [data, setData] = useState({})
  const [user, setUser] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [passCon, setPassCon] = useState('')
  // const [user, setUser] = useState(true);

  const handleChange = ({ target: { name, value } }) => {
    setData({ ...data, [name]: value })
    setUser('')
    setEmail('')
    setPassword('')
    setPassCon('')
  }

  // const handleUser = value => setUser(value);

  const handleSubmit = async e => {
    e.preventDefault()
    // const address = user ? 'brands' : 'writers';
    try {
      await axios.post('/api/brands/register', data)
      history.push('/')
    } catch (err) {
      
      if (err.response.data.errors.username.message) {
        setUser(err.response.data.errors.username.message)
      }
      if (err.response.data.errors.email.message) {
        setEmail(err.response.data.errors.email.message)
      }
      if (err.response.data.errors.password.message) {
        setPassword(err.response.data.errors.password.message)
      }
      if (err) {
        setPassCon('Does not match')
      }
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
                        user ? 'is-danger' : ''
                      }`}
                      placeholder="Brandname"
                      name="username"
                      onChange={handleChange}
                    />
                  </div>
                  {user && (
                    <small className="help is-danger">{user}</small>
                  )}
                </div>
                <div className="field">
                  <div className="control">
                    <input
                      className={`input is-large is-rounded ${
                        email ? 'is-danger' : ''
                      }`}
                      placeholder="Email"
                      name="email"
                      onChange={handleChange}
                    />
                  </div>
                  {email && (
                    <small className="help is-danger">{email}</small>
                  )}
                </div>
                <div className="field">
                  <div className="control">
                    <input
                      className={`input is-large is-rounded ${
                        password ? 'is-danger' : ''
                      }`}
                      type="password"
                      placeholder="Password"
                      name="password"
                      onChange={handleChange}
                    />
                  </div>
                  {password && (
                    <small className="help is-danger">{password}</small>
                  )}
                </div>
                <div className="field">
                  <div className="control">
                    <input
                      className={`input is-large is-rounded ${
                        passCon ? 'is-danger' : ''
                      }`}
                      type="password"
                      placeholder="Password Confirmation"
                      name="password_confirmation"
                      onChange={handleChange}
                    />
                  </div>
                  {passCon && (
                    <small className="help is-danger">
                      {passCon}
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
