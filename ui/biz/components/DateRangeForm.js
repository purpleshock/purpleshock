import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import DateRangePicker from 'react-daterange-picker'
import { Form } from 'semantic-ui-react'
import moment from 'moment'
import 'moment-range'

import calendarCSS from 'react-daterange-picker/dist/css/react-calendar.css'

const setValue = (startAt, endAt) => prevState => {
  return {
    isValid: startAt && endAt,
    value: moment.range(
      startAt,
      endAt
    )
  }
}

export default class DateRangeForm extends PureComponent {
  static propTypes = {
    onSearch: PropTypes.func
  }

  state = {
    isValid: false
  }

  render () {
    return (
      <div>
        <style dangerouslySetInnerHTML={{__html: calendarCSS}} />
        <Form onSubmit={this.onSubmit}>
          <Form.Field>
            <label>From</label>
            <DateRangePicker
              singleDateRange
              firstOfWeek={1}
              numberOfCalendars={2}
              selectionType='range'
              value={this.state.value}
              onSelect={this.onSelect}
            />
          </Form.Field>
          <Form.Button disabled={!this.state.isValid}>Find</Form.Button>
        </Form>
      </div>
    )
  }

  onSelect = range => {
    this.setState(setValue(range.start, range.end))
  }

  onSubmit = e => {
    const { start, end } = this.state.value
    e.preventDefault()
    this.props.onSearch(start.unix(), end.unix())
  }
}
