import React, { PureComponent } from 'react'
import { Card, Select, Form, Button } from 'semantic-ui-react'

export default class VoucherInfo extends PureComponent {
  constructor (props) {
    super(props)

    const { availableStatus, ...formData } = props
    this.state = {
      formData: {
        status: props.status
      }
    }
  }

  componentWillReceiveProps(nextProps) {
    this.syncFormDataWithProps(nextProps)
  }

  render () {
    return (
      <Card>
        <Card.Content>
          <Card.Header>{this.props.code}</Card.Header>
          <Card.Content>
            <Form onSubmit={this.onSubmit} loading={this.props.processing}>
              <Form.Field
                label='Status'
                control='select'
                value={this.state.formData.status}
                onChange={this.onChangeStatus}>
                {Object.entries(this.props.availableStatus).map(([key, val]) => {
                  const isDisabled = this.props.statusOptions.indexOf(val) < 0
                  return (
                    <option key={val} value={val} disabled={isDisabled}>
                      {key.charAt(0).toUpperCase() + key.slice(1).toLowerCase()}
                    </option>
                  )
                })}
              </Form.Field>
              <Form.Field
                label='Description'
                control='textarea'
                rows='3'
                value={this.props.description}
              />
              <Button type='button' onClick={this.onCancel}>Cancel</Button>
              <Button type='submit'>Submit</Button>
            </Form>
          </Card.Content>
        </Card.Content>
      </Card>
    )
  }

  syncFormDataWithProps (props) {
    this.setState(restoreFormData({
      status: props.status
    }))
  }

  onChangeStatus = e => {
    this.setState(updateFormData('status', e.target.value))
  }

  onCancel = () => {
    this.syncFormDataWithProps(this.props)
  }

  onSubmit = e => {
    e.preventDefault()
    this.props.onSubmit(this.state.formData)
  }
}

function restoreFormData (formData) {
  return function (prevState) {
    return {
      formData
    }
  }
}

function updateFormData (field, value) {
  return function (prevState) {
    return {
      formData: {
        ...prevState.formData,
        [field]: value
      }
    }
  }
}
