import React, { PureComponent } from 'react'
import Router from 'next/router'
import * as tokenApi from '../services/token'

export default ComposedComponent => class Authenticated extends PureComponent {
  static async getInitialProps (context) {
    const { req, res } = context

    // Check if token is valid
    const token = context.req ? req.cookies.token : tokenApi.getToken()
    let isValid = token !== null && token !== undefined && token !== ''
    if (isValid) {
      isValid = await tokenApi.isValid(token)
    }

    // redirect if token is invalid
    if (!isValid) {
      if (context.res) {
        context.res.redirect('/')
        context.res.finished = true
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
