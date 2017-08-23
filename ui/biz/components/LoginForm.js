import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import validator from 'validator'
import { Form, Button, Card, Input } from 'semantic-ui-react'
import styled from 'styled-components'

const Wrapper = styled.div`
  bottom: 0;
  height: 150px;
  left: 0;
  margin: auto;
  position: absolute;
  right: 0;
  top: 0;
  width: 300px;
`

const setValue = (field, value) => prevState => ({
  [field]: value
})

export default class LoginForm extends PureComponent {
  static propTypes = {
    onLogin: PropTypes.func.isRequired
  }

  state = {
    mail: '',
    password: ''
  }

  componentDidMount () {
    const mail = this._mail.inputRef.value
    const password = this._password.inputRef.value
    this.setState(setValue('mail', mail))
    this.setState(setValue('password', password))
  }

  render () {
    return (
      <Wrapper>
        <Form onSubmit={this.onSubmit} size='mini'>
          <Form.Field>
            <Input
              ref={c => this._mail = c}
              type='text'
              placeholder='mail'
              name='mail'
              onChange={this.onChange}
            />
          </Form.Field>
          <Form.Field>
            <Input
              ref={c => this._password = c}
              type='password'
              placeholder='password'
              name='password'
              onChange={this.onChange}
            />
          </Form.Field>
          <Button type='submit' disabled={!this.isFormValid()}>Login</Button>
        </Form>
      </Wrapper>
    )
  }

  isFormValid () {
    return (
      validator.isEmail(this.state.mail) &&
      validator.isLength(this.state.password, {
        min: 5,
        max: 30
      })
    )
  }

  onChange = (e, { name, value }) => {
    this.setState(setValue(name, value))
  }

  onSubmit = e => {
    e.preventDefault()
    this.props.onLogin(this.state.mail, this.state.password)
  }
}
