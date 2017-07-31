import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import validator from 'validator'

export default class LoginForm extends PureComponent {
  static propTypes = {
    onLogin: PropTypes.func.isRequired
  }

  state = {
    mail: '',
    password: ''
  }

  render () {
    return (
      <form method='post' onSubmit={this.onSubmit}>
        <input
          type='text'
          name='mail'
          value={this.state.mail}
          onChange={this.onChange()}
        />
        <input
          type='password'
          name='password'
          value={this.state.password}
          onChange={this.onChange()}
        />
        <input
          type='submit'
          disabled={!this.isFormValid()}
        />
      </form>
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

  onChange = () => e => {
    const { name, value } = e.target
    this.setState((state, props) => {
      return {
        ...state,
        [name]: value
      }
    })
  }

  onSubmit = e => {
    e.preventDefault()
    this.props.onLogin(this.state.mail, this.state.password)
  }
}