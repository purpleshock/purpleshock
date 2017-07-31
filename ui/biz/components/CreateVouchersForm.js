import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Form, Button } from 'semantic-ui-react'

export default class CreateVouchersForm extends PureComponent {
  static propTypes = {
    onCreate: PropTypes.func.isRequired
  }

  state = {
    numVouchers: 0,
    amount: 0,
    description: ''
  }

  render () {
    return (
      <Form onSubmit={this.onSubmit} size='mini'>
        <Form.Group>
          <Form.Field
            label='Number of vouchers'
            control='input'
            type='number'
            min={0}
            width={3}
            name='numVouchers'
            onChange={this.onChange}
          />
          <Form.Field
            label='Voucher amount'
            control='input'
            type='number'
            min={0}
            width={3}
            name='amount'
            onChange={this.onChange}
          />
        </Form.Group>
        <Form.Field
          label='Description'
          control='input'
          type='text'
          width={8}
          name='description'
          onChange={this.onChange}
        />
        <Button type='submit'>Create</Button>
      </Form>
    )
  }

  onChange = e => {
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
    const { numVouchers, amount, description } = this.state
    this.props.onCreate({
      numVouchers: parseInt(numVouchers),
      amount: parseInt(amount),
      description
    })
  }
}
