import React, { PureComponent } from 'react'
import Authenticated from '../components/Authenticated'

@Authenticated
export default class Dashboard extends PureComponent {
  render () {
    return <h1>hello world</h1>
  }
}
