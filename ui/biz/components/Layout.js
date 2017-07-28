import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { Container } from 'semantic-ui-react'

export default class Layout extends PureComponent {
  render () {
    return (
      <Container>
        {this.props.children}
      </Container>
    )
  }
}
