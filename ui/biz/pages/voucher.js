import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import Router from 'next/router'
import withRedux from 'next-redux-wrapper'
import Authenticated from '../components/Authenticated'
import Layout from '../components/Layout'
import { initStore } from '../store'
import { searchVoucher } from '../actions/voucher'
import VoucherInfo from '../components/VoucherInfo'

@Authenticated
@withRedux(initStore, mapStateToProps)
export default class Voucher extends PureComponent {
  static async getInitialProps ({ isServer, store, query }) {
    await store.dispatch(searchVoucher(query.voucherCode))
    return {}
  }

  render () {
    return (
      <Layout>
        <VoucherInfo
          availableStatus={this.props.availableStatus}
          {...this.props.voucherInfo}
        />
      </Layout>
    )
  }
}

function mapStateToProps (state) {
  return {
    availableStatus: state.voucherAvailableStatus,
    voucherInfo: state.voucherActivity.voucher
  }
}