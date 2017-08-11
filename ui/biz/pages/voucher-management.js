import React, { PureComponent } from 'react'
import { bindActionCreators } from 'redux'
import withRedux from 'next-redux-wrapper'
import Authenticated from '../components/middleware/Authenticated'
import Layout from '../components/Layout'
import { initStore } from '../store'
import { searchHistory } from '../actions/voucherHistory'
import * as voucherActions from '../actions/voucher'
import * as suggestActions from '../actions/suggest'
import CreateVouchersForm from '../components/CreateVouchersForm'
import FindVoucher from '../components/FindVoucher'

function mapStateToProps (state) {
  return {
    availableStatus: state.voucherAvailableStatus,
    suggestions: {
      results: state.codeFinder.vouchers,
      isLoading: state.codeFinder.isLoading
    }
  }
}

function mapDispatchToProps (dispatch) {
  return {
    ...bindActionCreators({
      onCreateVouchers: voucherActions.createVouchers,
      onSearchSuggest: suggestActions.searchCodes
    }, dispatch)
  }
}

@Authenticated
@withRedux(initStore, mapStateToProps, mapDispatchToProps)
export default class VoucherManagement extends PureComponent {
  render () {
    return (
      <Layout>
        <CreateVouchersForm
          onCreate={this.props.onCreateVouchers}
        />
        <FindVoucher
          onSearch={this.props.onSearchSuggest}
          availableStatus={this.props.availableStatus}
          {...this.props.suggestions}
        />
      </Layout>
    )
  }
}
