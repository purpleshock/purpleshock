import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import withRedux from 'next-redux-wrapper'
import Authenticated from '../components/Authenticated'
import Layout from '../components/Layout'
import { initStore } from '../store'
import { searchHistory } from '../actions/voucherHistory'
import { createVouchers } from '../store/vouchers'
import CreateVouchersForm from '../components/CreateVouchersForm'
import FindVoucher from '../components/FindVoucher'

@Authenticated
@withRedux(initStore, mapStateToProps, mapDispatchToProps)
export default class VoucherManagement extends PureComponent {
  static propTypes = {
    onCreateVouchers: PropTypes.func.isRequired
  }

  render () {
    return (
      <Layout>
        <CreateVouchersForm onCreate={this.props.onCreateVouchers} />
        <FindVoucher />
      </Layout>
    )
  }
}

function mapStateToProps (state) {
  return {
    histories: state.voucherHistory.histories,
    pagination: state.voucherHistoryPagination
  }
}

function mapDispatchToProps (dispatch) {
  return {
    ...bindActionCreators({
      onCreateVouchers: createVouchers
    }, dispatch)
  }
}
