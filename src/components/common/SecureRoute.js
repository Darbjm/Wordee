import propTypes from 'prop-types'
import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { isAuthenticated, logout } from '../lib/auth'

/**Component for SecureRoute */
const SecureRoute = ({ component: Component, ...rest }) => {
  if (isAuthenticated()) return <Route {...rest} component={Component} />
  logout()
  return <Redirect to="/" />
}

SecureRoute.propTypes = {
  component: propTypes.func,
  Component: propTypes.func
}

export default SecureRoute
