import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Input } from 'semantic-ui-react'
import { bindActionCreators } from 'redux'
import window from 'global/window'
import VoucherList from './VoucherList'
import * as suggestActions from '../actions/suggest'

function mapStateToProps (state) {
  return {
    availableStatus: state.voucherAvailableStatus,
    results: state.codeFinder.vouchers,
    isLoading: state.codeFinder.isLoading
  }
}

function mapDispatchToProps (dispatch) {
  return {
    ...bindActionCreators({
      onSearch: suggestActions.searchCodes
    }, dispatch)
  }
}

@connect(mapStateToProps, mapDispatchToProps)
export default class FindVoucher extends PureComponent {
  static propTypes = {
    availableStatus: PropTypes.oneOfType([
      PropTypes.object,
      PropTypes.bool
    ]).isRequired,
    results: PropTypes.array.isRequired,
    isLoading: PropTypes.bool.isRequired,
    delay: PropTypes.number.isRequired,
    onSearch: PropTypes.func
  }

  static defaultProps = {
    delay: 500
  }

  _interval = 0

  state = {
    value: ''
  }

  render () {
    return (
      <div>
        <Input
          placeholder='Voucher code ...'
          loading={this.props.isLoading}
          onChange={this.onSearchChange}
        />
        <VoucherList
          availableStatus={this.props.availableStatus}
          vouchers={this.props.results}
        />
      </div>
    )
  }

  onSearchChange = (e, { value }) => {
    window.clearTimeout(this._interval)

    this.setState(prevState => {
      return {
        value
      }
    }, () => {
      this._interval = window.setTimeout(() => {
        this.props.onSearch(this.state.value)
      }, this.props.delay)
    })
  }
}
