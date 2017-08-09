import React, { PureComponent } from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { Container, Menu, SideBar } from 'semantic-ui-react'
import Link from 'next/link'

const MenuLink = styled.a`
  align-items: center;
  display: flex;
  padding: 10px;
`

export default class Layout extends PureComponent {
  static propTypes = {
    children: PropTypes.node
  }

  render () {
    return (
      <div>
        <Menu attached='top'>
          <Menu.Item as={Link} href='/dashboard' passHref>
            <MenuLink>
              Dashboard
            </MenuLink>
          </Menu.Item>
          <Menu.Item as={Link} href='/voucher-management' passHref>
            <MenuLink>
              Management
            </MenuLink>
          </Menu.Item>
        </Menu>
        <Container>
          {this.props.children}
        </Container>
      </div>
    )
  }
}
