import React, { PureComponent } from 'react'
import { Card, Select, Form } from 'semantic-ui-react'

export default class VoucherInfo extends PureComponent {
  render () {
    return (
      <Card>
        <Card.Content>
          <Card.Header>{this.props.code}</Card.Header>
          <Card.Content>
            <Form>
              <Form.Field
                label='Status'
                control='select'
                value={this.props.status}>
                {Object.entries(this.props.availableStatus).map(([key, val]) =>
                  <option key={val} value={val}>
                    {key.charAt(0).toUpperCase() + key.slice(1).toLowerCase()}
                  </option>
                )}
              </Form.Field>
              <Form.Field
                label='Description'
                control='textarea'
                rows='3'
                value={this.props.description}
              />
            </Form>
          </Card.Content>
        </Card.Content>
      </Card>
    )
  }
}
