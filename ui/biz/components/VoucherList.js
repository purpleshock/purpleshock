import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Card } from 'semantic-ui-react'
import styled from 'styled-components'
import * as voucherStatus from '../consts/voucherStatus'

const TimeList = styled.ul`
  color: #666;
  font-size: 8px;
  line-height: 20px;
  list-style-type: none;
  padding: 0;
`

const DescriptionBody = styled.p`
  color: #333;
  font-size: 13px;
`
const BaseStatus = styled.span`
  border: 1px solid #A0A0A0;
  border-radius: 5px;
  color: #A0A0A0;
  font-size: 8px;
  padding: 0 5px;
  text-transform: lowercase;
`

const Activated = BaseStatus.extend`
  border: 1px solid #32CD32;
  color: #32CD32;
`

const Deactivated = BaseStatus.extend`
  border: 1px solid #B03060;
  color: #B03060;
`

const HeaderWrapper = styled.div`
  align-items: center;
  display: flex;
  justify-content: space-between;
`

export class Voucher extends PureComponent {
  render () {
    return (
      <Card>
        <Card.Content>
          <Card.Header>
            <HeaderWrapper>
              {this.props.code}
              {this.renderStatusMeta()}
            </HeaderWrapper>
          </Card.Header>
        </Card.Content>
      </Card>
    )
  }

  renderStatusMeta () {
    const { status } = this.props
    switch (status) {
      case voucherStatus.ACTIVATED:
        return <Activated>{status}</Activated>
      case voucherStatus.DEACTIVATED:
        return <Deactivated>{status}</Deactivated>
      default:
        return <BaseStatus>{status}</BaseStatus>
    }
  }
}

export default class VoucherList extends PureComponent {
  static propTypes = {
    vouchers: PropTypes.array
  }

  static defaultProps = {
    vouchers: []
  }

  render () {
    return (
      <Card.Group>
        {this.props.vouchers.map(voucher =>
          <Voucher key={voucher.code} {...voucher} />
        )}
      </Card.Group>
    )
  }
}