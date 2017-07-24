import React, { PureComponent } from 'react'
import Router from 'next/router'
import axios from 'axios'
import * as tokenApi from '../services/token'

export default ComposedComponent => class Authenticated extends PureComponent {
  static async getInitialProps (context) {
    const { req, res } = context
    const isServer = req && res

    // Check if token is valid
    const token = isServer ? req.cookies.token : tokenApi.getToken()
    let isValid = token !== null && token !== undefined && token !== ''
    if (isValid) {
      isValid = await tokenApi.isValid(token)
    }

    if (isValid) {
      // set axios header
      axios.defaults.headers.common.Authorization = `JWT ${token}`
    } else {
      // redirect if token is invalid
      if (isServer) {
        res.redirect('/')
        res.finished = true
      } else {
        Router.replace('/')
      }
    }

    if (typeof ComposedComponent.getInitialProps === 'function') {
      return await ComposedComponent.getInitialProps(context)
    } else {
      return {}
    }
  }

  render () {
    return (
      <ComposedComponent {...this.props} />
    )
  }
}
