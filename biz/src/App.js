import React, { PureComponent } from 'react'
import styled from 'styled-components'
import { inject, observer } from 'mobx-react'
import Login from './pages/login/Login'

const Pages = <div>hello</div>

@inject(['userStore'])
@observer
export default class App extends PureComponent {
  render () {
    const { isLoading, isAuthenticated } = this.props.userStore

    if (isLoading) {
      return false
    }

    if (isAuthenticated) {
      return <Pages />
    }

    return <Login />
  }
}
