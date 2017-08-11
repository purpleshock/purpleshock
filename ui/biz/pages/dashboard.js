import React, { PureComponent } from 'react'
import Authenticated from '../components/middleware/Authenticated'
import Layout from '../components/Layout'

@Authenticated
export default class Dashboard extends PureComponent {
  render () {
    return (
      <Layout>
        <h1>hello world</h1>
      </Layout>
    )
  }
}
