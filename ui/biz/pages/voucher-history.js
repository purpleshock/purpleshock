import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import Router from 'next/router'
import withRedux from 'next-redux-wrapper'
import moment from 'moment'
import R from 'ramda'
import Authenticated from '../components/middleware/Authenticated'
import Layout from '../components/Layout'
import { initStore } from '../store'
import { searchHistory } from '../actions/voucherHistory'
import DateRangeForm from '../components/DateRangeForm'
import HistoryList from '../components/HistoryList'

const needQuery = (query, nextQuery) =>
  !R.isEmpty(nextQuery) &&
  !R.isEmpty(nextQuery.from) &&
  !R.isEmpty(nextQuery.to) &&
  !R.equals(query, nextQuery)

function mapStateToProps (state) {
  return {
    histories: state.voucherHistory.creationOrder
  }
}

function mapDispatchToProps (dispatch) {
  return {
    ...bindActionCreators({
      searchHistory
    }, dispatch)
  }
}

@Authenticated
@withRedux(initStore, mapStateToProps, mapDispatchToProps)
export default class VoucherHistory extends PureComponent {
  static getInitialProps ({ query }) {
    return { query }
  }

  componentDidMount () {
    const { query } = this.props
    if (needQuery(null, query)) {
      this.props.searchHistory(query.from, query.to, 1)
    }
  }

  componentWillReceiveProps (nextProps) {
    if (needQuery(this.props.query, nextProps.query)) {
      nextProps.searchHistory(nextProps.query.from, nextProps.query.to, 1)
    }
  }

  render () {
    const { query } = this.props
    return (
      <Layout>
        <DateRangeForm
          startAt={query.from}
          endAt={query.to}
          onSearch={this.onSearchHistory}
        />
        <HistoryList
          histories={this.props.histories}
        />
      </Layout>
    )
  }

  onSearchHistory = (from, to) => {
    Router.push({
      pathname: '/voucher-history',
      query: {
        from,
        to
      }
    })
  }
}
