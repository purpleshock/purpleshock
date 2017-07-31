import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Container } from 'semantic-ui-react'

export default class Layout extends PureComponent {
  static propTypes = {
    children: PropTypes.node
  }

  render () {
    return (
      <Container>
        {this.props.children}
      </Container>
    )
  }
}
