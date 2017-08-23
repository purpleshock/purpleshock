import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import Router from 'next/router'
import { bindActionCreators } from 'redux'
import withRedux from 'next-redux-wrapper'
import { initStore } from '../store'
import * as userActions from '../store/user'
import Layout from '../components/Layout'
import LoginForm from '../components/LoginForm'

class Index extends PureComponent {
  static propTypes = {
    login: PropTypes.func.isRequired
  }

  render () {
    return <LoginForm onLogin={this.props.login} />
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
