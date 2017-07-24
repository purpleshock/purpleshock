import React, { PureComponent } from 'react'
import { bindActionCreators } from 'redux'
import Router from 'next/router'
import withRedux from 'next-redux-wrapper'
import moment from 'moment'
import { Container } from 'semantic-ui-react'
import Authenticated from '../components/Authenticated'
import CreateVouchersForm from '../components/CreateVouchersForm'
import Layout from '../components/Layout'
import OperationHistory from '../components/OperationHistory'
import DateRangeForm from '../components/DateRangeForm'
import Pagination from '../components/Pagination'
import { initStore } from '../store'
import { searchHistory } from '../actions/voucherHistory'
import { createVouchers } from '../store/vouchers'
import { stringify } from '../services/querystring'

@Authenticated
@withRedux(initStore, mapStateToProps, mapDispatchToProps)
export default class VoucherManagement extends PureComponent {
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
        <DateRangeForm onSearch={this.onSearchHistory} />
        {this.props.prefetch &&
          <Container>
            <OperationHistory histories={this.props.histories} />
            {/* <Pagination {...this.props.pagination} /> **/}
          </Container>
        }
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
