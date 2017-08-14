import React, { PureComponent } from 'react'
import Router from 'next/router'
import axios from 'axios'
import * as tokenApi from '../../services/token'

export default ComposedComponent => class Authenticated extends PureComponent {
  static async getInitialProps (context) {
    const { req, res } = context
    const isServer = req && res

    // Check if token is valid
    let token = isServer ? req.cookies.token : tokenApi.getToken()
    let isValid = token !== null && token !== undefined && token !== ''
    if (isValid) {
      isValid = await tokenApi.isValid(token)
    }

    if (!isValid) {
      token = ''

      // redirect if token is invalid
      if (isServer) {
        res.redirect('/')
        res.finished = true
      } else {
        Router.replace('/')
      }
    }

    const props = {
      token
    }
    if (typeof ComposedComponent.getInitialProps === 'function') {
      props.componentProps = await ComposedComponent.getInitialProps(context)
    }

    return props
  }

  componentWillMount () {
    if (this.props.token) {
      axios.defaults.headers.common.Authorization = `JWT ${this.props.token}`
    }
  }

  render () {
    return (
      <ComposedComponent {...this.props.componentProps} />
    )
  }
}
