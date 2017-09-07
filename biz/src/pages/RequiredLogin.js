import React, { PureComponent } from 'react'
import { Route, Redirect } from 'react-router'
import { observer, inject } from 'mobx-react'

@inject('userState')
@observer
export default class RequiredLogin extends PureComponent {
  componentDidMount () {
    this.props.userState.isLogin()
  }

  render () {
    const { userState, component, ...rest } = this.props
    const { isLoading, isAuthenticated } = userState

    if (isLoading) {
      return false
    }

    if (isAuthenticated) {
      return <Route {...rest} component={component} />
    } else {
      return <Redirect to='/' />
    }
  }
}
