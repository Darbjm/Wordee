import React from 'react'
import ReactDOM from 'react-dom'
import './styles/main.scss'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import 'bulma'

import SecureRoute from './components/common/SecureRoute'
import Login from './components/auth/Login'
import Register from './components/auth/Register'
import BackEnd from './components/auth/BackEnd'
import EditProfile from './components/brands/EditProfile'
import Profile from './components/brands/BrandProfile'
import Brandbrief from './components/briefs/Brandbrief'
import BrandEditBrief from './components/briefs/BrandEditBrief'
import FailedPage from './components/common/FailedPage'
import BackEndLogin from './components/auth/BackEndLogin'

const App = () => (
  <BrowserRouter>
  <>
    <Switch>
      <Route exact path="/" component={Login} />
      <Route path="/register" component={Register} />
      <Route path="/admin" component={BackEndLogin} />
      <SecureRoute path="/backendtesting5702918301" component={BackEnd} />
      <SecureRoute path="/profile/:id/edit" component={EditProfile} />
      <SecureRoute path="/profile/:id" component={Profile} />
      <SecureRoute path="/createbrandbrief/:id" component={Brandbrief} />
      <SecureRoute path="/editbrief/:id" component={BrandEditBrief} />
      <Route path="/*" component={FailedPage} />
    </Switch>
  </>
  </BrowserRouter>
)
ReactDOM.render(
  <App />,
  document.getElementById('root')
)