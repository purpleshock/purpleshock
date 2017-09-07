import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Form, Button, Card, Input } from 'semantic-ui-react'
import styled from 'styled-components'
import { inject, observer } from 'mobx-react'

const CenteredLayout = styled.div`
  align-items: center;
  display: flex;
  justify-content: center;
`

const Wrapper = styled.div`
  height: 150px;
  width: 300px;
`

@inject(['userStore'])
@observer
export default class Login extends PureComponent {
  render () {
    const { userStore } = this.props
    return (
      <CenteredLayout>
        <Wrapper>
          <Form onSubmit={this.onSubmit} size='mini'>
            <Form.Field>
              <Input
                type='text'
                placeholder='mail'
                name='mail'
                value={userStore.user.get('mail')}
                onChange={this.onChange}
              />
            </Form.Field>
            <Form.Field>
              <Input
                type='password'
                placeholder='password'
                name='password'
                value={userStore.user.get('password')}
                onChange={this.onChange}
              />
            </Form.Field>
            <Button type='submit' disabled={!userStore.isValid}>Login</Button>
          </Form>
        </Wrapper>
      </CenteredLayout>
    )
  }

  onChange = (e, { name, value }) => {
    this.props.userStore.change(name, value)
  }

  onSubmit = e => {
    e.preventDefault()
    this.props.userStore.login()
  }
}
