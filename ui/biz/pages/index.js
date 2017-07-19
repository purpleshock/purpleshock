import React, { PureComponent } from 'react'
import { bindActionCreators } from 'redux'
import withRedux from 'next-redux-wrapper'
import axios from 'axios'
import { initStore } from '../store'
import { login } from '../store/user'
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
  return bindActionCreators({ login }, dispatch)
}

export default withRedux(initStore, null, mapDispatchToProps)(Index)
