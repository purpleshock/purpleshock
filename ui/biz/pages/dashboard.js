import React, { PureComponent } from 'react'
import Authenticated from '../components/Authenticated'

class Dashboard extends PureComponent {
  render () {
    return <h1>hello world</h1>
  }
}

export default Authenticated(Dashboard)
