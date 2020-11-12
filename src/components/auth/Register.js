import propTypes from 'prop-types'
import React, { useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { getUser, setToken } from '../lib/auth'
import logo from '../../styles/images/Wordee.svg'

/**Component to render register form*/
const Register = ({ history }) => {
  const [userData, setUserData] = useState({})
  const [userError, setUserError] = useState('')
  const [emailError, setEmailError] = useState('')
  const [passwordError, setPasswordError] = useState('')
  const [passConError, setPassConError] = useState('')
  // const [user, setUser] = useState(true);

  const handleChange = ({ target: { name, value } }) => {
    setUserData({ ...userData, [name]: value })
    setUserError('')
    setEmailError('')
    setPasswordError('')
    setPassConError('')
  }

  // const handleUser = value => setUser(value);

  const handleSubmit = async e => {
    e.preventDefault()
    // const address = user ? 'brands' : 'writers';
    if (userData.username === undefined || userData.email === undefined || userData.password === undefined || userData.password_confirmation === undefined) {
      setUserError('Please fill all sections')
      setEmailError('Please fill all sections')
      setPasswordError('Please fill all sections')
      return setPassConError('Please fill all sections')
    }
    const reqBody = {
      query: `
        mutation {
          createUser(userInput: {
            username: "${userData.username}", 
            email: "${userData.email}", 
            password: "${userData.password}", 
            passwordConfirmation: "${userData.password_confirmation}"
            })
            {
            username 
            email 
          }
        }
      `
    }
    try {
      const {
        data: { data }
      } = await axios.post('http://localhost:4000/graphql', reqBody)
      const loginBody = {
        query: `
        query {
          login(email: "${data.createUser.email}", password: "${userData.password}") {
            userId
            token
          }
        }
        `
      }
      const {
        data: { data: { login } }
      } = await axios.post('http://localhost:4000/graphql', loginBody)
      setToken(login.token)
      history.push(`/profile/${getUser()}`)
    } catch (err) {
      console.log(err)
      if (err.response.data.errors.username.message) {
        setUserError(err.response.data.errors.username.message)
      }
      if (err.response.data.errors.email.message) {
        setEmailError(err.response.data.errors.email.message)
      }
      if (err.response.data.errors.password.message) {
        setPasswordError(err.response.data.errors.password.message)
      }
      if (err) {
        setPassConError('Does not match')
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
                        userError ? 'is-danger' : ''
                      }`}
                      placeholder="Brandname"
                      name="username"
                      onChange={handleChange}
                    />
                  </div>
                  {userError && (
                    <small className="help is-danger">{userError}</small>
                  )}
                </div>
                <div className="field">
                  <div className="control">
                    <input
                      className={`input is-large is-rounded ${
                        emailError ? 'is-danger' : ''
                      }`}
                      placeholder="Email"
                      name="email"
                      onChange={handleChange}
                    />
                  </div>
                  {emailError && (
                    <small className="help is-danger">{emailError}</small>
                  )}
                </div>
                <div className="field">
                  <div className="control">
                    <input
                      className={`input is-large is-rounded ${
                        passwordError ? 'is-danger' : ''
                      }`}
                      type="password"
                      placeholder="Password"
                      name="password"
                      onChange={handleChange}
                    />
                  </div>
                  {passwordError && (
                    <small className="help is-danger">{passwordError}</small>
                  )}
                </div>
                <div className="field">
                  <div className="control">
                    <input
                      className={`input is-large is-rounded ${
                        passConError ? 'is-danger' : ''
                      }`}
                      type="password"
                      placeholder="Password Confirmation"
                      name="password_confirmation"
                      onChange={handleChange}
                    />
                  </div>
                  {passConError && (
                    <small className="help is-danger">
                      {passConError}
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
