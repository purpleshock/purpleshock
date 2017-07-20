import React, { PureComponent } from 'react'
import Router from 'next/router'
import { bindActionCreators } from 'redux'
import withRedux from 'next-redux-wrapper'
import axios from 'axios'
import { initStore } from '../store'
import * as userActions from '../store/user'
import LoginForm from '../components/LoginForm'
import * as token from '../services/token'

class Index extends PureComponent {
  render () {
    return (
      <LoginForm onLogin={this.props.login} />
    )
  }
}

function mapDispatchToProps (dispatch) {
  const actionCreators = bindActionCreators({
    login: userActions.login
  }, dispatch)

  return {
    login (mail, password) {
      actionCreators
        .login(mail, password)
        .then(() => Router.push('/dashboard'))
    }
  }
}

export default withRedux(initStore, null, mapDispatchToProps)(Index)
