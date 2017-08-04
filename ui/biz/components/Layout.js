import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Container, Menu, SideBar, Icon } from 'semantic-ui-react'
import Link from './Link'

export default class Layout extends PureComponent {
  static propTypes = {
    children: PropTypes.node
  }

  render () {
    return (
      <div>
        <Menu attached='top'>
          <Menu.Item as={Link} href='/dashboard'>
            <Icon name='dashboard' />
            Dashboard
          </Menu.Item>
          <Menu.Item as={Link} href='/voucher-management'>
            <Icon name='tasks' />
            Management
          </Menu.Item>
        </Menu>
        <Container>
          {this.props.children}
        </Container>
      </div>
    )
  }
}
