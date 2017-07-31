import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import Router from 'next/router'
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

  static async getInitialProps ({ isServer, store, query }) {
    const prefetch = query && query.page && (query.validAt || query.expiredAt)
    const props = {
      prefetch
    }

    if (prefetch) {
      const { validAt, expiredAt, page } = query
      if (isServer) {
        await store.dispatch(searchHistory(validAt, expiredAt, page))
      } else {
        store.dispatch(searchHistory(validAt, expiredAt, page))
      }
    }

    return props
  }

  render () {
    return (
      <Layout>
        <CreateVouchersForm onCreate={this.props.onCreateVouchers} />
        <FindVoucher />
      </Layout>
    )
  }

  onSearchHistory = (validAt, expiredAt) => {
    if (validAt || expiredAt) {
      Router.push({
        pathname: '/voucher-management',
        query: {
          page: 1,
          validAt: validAt && validAt.unix(),
          expiredAt: expiredAt && expiredAt.unix()
        }
      })
    }
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
      onCreateVouchers: createVouchers,
      onSearchHistory: searchHistory
    }, dispatch)
  }
}
