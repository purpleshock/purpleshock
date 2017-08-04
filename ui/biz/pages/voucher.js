import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import Router from 'next/router'
import withRedux from 'next-redux-wrapper'
import Authenticated from '../components/Authenticated'
import Layout from '../components/Layout'
import { initStore } from '../store'
import { searchVoucher, modifyVoucher } from '../actions/voucher'
import VoucherInfo from '../components/VoucherInfo'

@Authenticated
@withRedux(initStore, mapStateToProps, mapDispatchToProps)
export default class Voucher extends PureComponent {
  static async getInitialProps ({ isServer, store, query }) {
    await store.dispatch(searchVoucher(query.voucherCode))
    return {}
  }

  render () {
    return (
      <Layout>
        <VoucherInfo
          {...this.props.voucherInfo}
          processing={this.props.isVoucherLoading}
          availableStatus={this.props.availableStatus}
          onSubmit={this.props.modifyVoucher}
        />
      </Layout>
    )
  }
}

function mapStateToProps (state) {
  return {
    availableStatus: state.voucherAvailableStatus,
    isVoucherLoading: state.voucherActivity.isLoading,
    voucherInfo: state.voucherActivity.voucher
  }
}

function mapDispatchToProps (dispatch, ownProps) {
  const { voucherCode } = ownProps.url.query
  return {
    modifyVoucher (formData) {
      dispatch(modifyVoucher(voucherCode, formData))
      .then(() => dispatch(searchVoucher(voucherCode)))
    }
  }
}
