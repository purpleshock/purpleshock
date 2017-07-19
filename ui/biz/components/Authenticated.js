import React, { PureComponent } from 'react'
import Router from 'next/router'
import * as token from '../services/token'

export default ComposedComponent => class Authenticated extends PureComponent {
  static async getInitialProps (context) {
    const { req, res } = context

    const isValid = await token.isValid(req.cookies.token)
    if (!isValid) {
      if (res) {
        res.redirect('/')
        res.finished = true
      } else {
        Router.replace('/')
      }
    }

    let props
    if (typeof ComposedComponent.getInitialProps === 'function') {
      props = await ComposedComponent.getInitialProps(context)
    }

    return props || {}
  }

  render () {
    return (
      <ComposedComponent {...this.props} />
    )
  }
}
