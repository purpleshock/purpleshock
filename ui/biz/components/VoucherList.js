import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import Link from 'next/link'
import { Card } from 'semantic-ui-react'
import styled from 'styled-components'

const Code = styled.a`
  flex: 1;
  font-size: 12px;
  text-transform: uppercase;
`

const BaseStatus = styled.span`
  border-radius: 5px;
  border: 1px solid;
  border-color: #333;
  color: #333;
  font-size: 10px;
  padding: 0 3px;
  text-transform: lowercase;
`

const Deactivated = BaseStatus.extend`
  border-color: #B03060;
  color: #B03060
`

const Activated = BaseStatus.extend`
  border-color: #008080;
  color: #008080
`

const Amount = styled.span`
  color: #666;
  font-size: 10px;
`

const HistoryLink = styled.a`
  color: #666;
  display: block;
  font-size: 10px;
  text-align: right;
`

export default class VoucherList extends PureComponent {
  static propTypes = {
    vouchers: PropTypes.array,
    availableStatus: PropTypes.oneOfType([
      PropTypes.object,
      PropTypes.bool
    ])
  }

  static defaultProps = {
    vouchers: []
  }

  render () {
    return (
      <Card.Group>
        {this.props.vouchers.map(voucher =>
          <Card key={voucher.code}>
            <Card.Content>
              <Card.Header>
                <Link href={`/voucher/${voucher.code}`}>
                  <Code>{voucher.code}</Code>
                </Link>
              </Card.Header>
              <Card.Description>
                {this.renderStatus(voucher.status)}
                <Amount>{voucher.amount}</Amount>
                <Link href={`/voucher-history/${voucher.batch}`}>
                  <HistoryLink>other vouchers ...</HistoryLink>
                </Link>
              </Card.Description>
            </Card.Content>
          </Card>
        )}
      </Card.Group>
    )
  }

  renderStatus (status) {
    const { availableStatus } = this.props
    if (status === availableStatus.ACTIVATED) {
      return <Activated>{status}</Activated>
    } else if (status === availableStatus.DEACTIVATED) {
      return <Deactivated>{status}</Deactivated>
    } else {
      return <BaseStatus>{status}</BaseStatus>
    }
  }
}
