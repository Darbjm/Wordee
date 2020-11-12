import propTypes from 'prop-types'
import React, { useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { setToken, getUser } from '../lib/auth'
import logo from '../../styles/images/Wordee.svg'

/**Component to render login form*/
const Login = ({ history }) => {
  const [loginData, setLoginData] = useState({})
  const [error, setError] = useState('')
  // const [user, setUser] = useState(true);

  /**Change data in state */
  const handleChange = ({ target: { name, value } }) =>
    setLoginData({ ...loginData, [name]: value })

  // const handleUser = value => setUser(value);

  /**Submit data for login */
  const handleSubmit = async e => {
    e.preventDefault()
    // const address = user ? 'brands' : 'writers';
    const reqBody = {
      query: `
      query {
        login(email: "${loginData.email}", password: "${loginData.password}") {
          userId
          token
        }
      }
      `
    }
    try {
      const {
        data: { data: { login } }
      } = await axios.post('http://localhost:4000/graphql', reqBody)
      setToken(login.token)
      history.push(`/profile/${getUser()}`)
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
            {/* This section will be used if the writers need a login */}
            {/* <div className="field">
              <div className="oneline">
                <h2 className="label">Login as a:</h2>
                <div className="control">
                  <label className="radio" htmlFor="brandradio2">
                    <input
                      id="brandradio2"
                      name="user"
                      type="radio"
                      value="brand"
                      onChange={() => handleUser(true)}
                      checked={user === true}
                    />
                    Brand
                  </label>
                  <label className="radio" htmlFor="userradio2">
                    <input
                      id="userradio2"
                      name="user"
                      type="radio"
                      value="writer"
                      onChange={() => handleUser(false)}
                      checked={user === false}
                    />
                    Writer
                  </label>
                </div>
              </div>
            </div> */}
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
                Login
              </button>
            </div>
            <div className="reg">
              <p>{'Don\'t have an account?'}</p> <Link to="/register">Register</Link>
            </div>
          </form>
        </div>
      </section>
    </main>
  )
}

Login.propTypes = {
  history: propTypes.object
}

export default Login
