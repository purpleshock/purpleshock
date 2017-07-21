import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import Head from 'next/head'
import { Container } from 'semantic-ui-react'

export default class Layout extends PureComponent {
  render () {
    return (
      <div className='menu-layout'>
        <Head>
          <link rel="stylesheet" href="//cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.2.11/semantic.min.css" />
        </Head>
        <Container>
          {this.props.children}
        </Container>
      </div>
    )
  }
}
