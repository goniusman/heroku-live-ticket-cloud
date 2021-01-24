import React from 'react'
import ReactDOM from 'react-dom'

import {BrowserRouter, Route, Switch} from 'react-router-dom'
import { Provider } from 'react-redux'
import jwtDecode from 'jwt-decode'

import 'bootstrap/dist/css/bootstrap.min.css'

import store from './store'
import './index.css'
import Ticket from './components/tickets'
import SingleTest from './components/single-titket'
import reportWebVitals from './reportWebVitals'
import User from './components/admin/user/index'
import Admin from './components/admin'
import Test from './components/admin/test/index'
import Register from './components/admin/pages/register'
import Login from './components/admin/pages/login'
import * as Types from './store/actions/types'
import setAuthToken from './utils/setAuthToken'





const token = localStorage.getItem('auth_token')
if (token) {
    let decode = jwtDecode(token)
    setAuthToken(token)
    store.dispatch({
        type: Types.SET_USER,
        payload: {
            user: decode
        }
    })
}


ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Ticket} />
        <Route path="/ticket/:slug" exact component={SingleTest} /> 
        <Route path="/register" exact component={Register} /> 
        <Route path="/login" exact component={Login} /> 
        <Route path="/admin" exact component={Admin} /> 
        <Route path="/user" exact component={User} /> 
        <Route path="/test" exact component={Test} /> 
      </Switch>
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);

reportWebVitals();
