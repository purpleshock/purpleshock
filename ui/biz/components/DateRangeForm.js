import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import DateRangePicker from 'react-daterange-picker'
import { Form } from 'semantic-ui-react'
import moment from 'moment'
import 'moment-range'

import calendarCSS from 'react-daterange-picker/dist/css/react-calendar.css'

export default class DateRangeForm extends PureComponent {
  static propTypes = {
    onSearch: PropTypes.func
  }

  state = {
    startAt: null,
    endAt: null,
    isValid: false
  }

  render () {
    const { startAt, endAt, isValid } = this.state

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
              value={startAt && endAt && moment.range(startAt, endAt)}
              onSelect={this.onSelect}
            />
          </Form.Field>
          <Form.Button disabled={!isValid}>Find</Form.Button>
        </Form>
      </div>
    )
  }

  onSelect = range => {
    this.setState(() => {
      return {
        isValid: range.start && range.end,
        startAt: range.start,
        endAt: range.end
      }
    })
  }

  onSubmit = e => {
    const { startAt, endAt } = this.state
    e.preventDefault()
    this.props.onSearch(startAt, endAt)
  }
}
