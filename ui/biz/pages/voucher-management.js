import React, { PureComponent } from 'react'
import { bindActionCreators } from 'redux'
import withRedux from 'next-redux-wrapper'
import { initStore } from '../store'
import { createVoucher } from '../store/vouchers'
import Authenticated from '../components/Authenticated'
import CreateVouchersForm from '../components/CreateVouchersForm'
import Layout from '../components/Layout'

@Authenticated
@withRedux(initStore, null, mapDispatchToProps)
export default class VoucherManagement extends PureComponent {
  render () {
    return (
      <Layout>
        <CreateVouchersForm onCreate={this.props.onCreateVouchers} />
      </Layout>
    )
  }
}

function mapDispatchToProps (dispatch) {
  return {
    ...bindActionCreators({
      onCreateVouchers: createVoucher
    }, dispatch)
  }
}
