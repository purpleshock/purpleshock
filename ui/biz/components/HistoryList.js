import React, { PureComponent } from 'react'
import { AutoSizer, InfiniteLoader, List } from 'react-virtualized'
import { List as SemanticList, Icon } from 'semantic-ui-react'
import Link from 'next/link'
import moment from 'moment'
import styled from 'styled-components'

const Wrapper = styled.div`
  display: flex;
`

const InnerWrapper = styled.div`
  flex: 1 1 auto;
  height: 100%;
`

const formatDate = unix => moment.unix(unix).format('MMMM DD, YYYY h:mm A')

export default class HistoryList extends PureComponent {
  render () {
    const { histories } = this.props
    const rowCount = histories ? histories.length : 0
    return (
      <AutoSizer>
        {({ height, width }) =>
          <List
            rowHeight={50}
            width={width}
            height={height}
            rowCount={rowCount}
            rowRenderer={({ key, index, style, isScrolling }) => {
              const record = histories[index]
              return (
                <SemanticList.Item key={key} style={style}>
                  {isScrolling &&
                    <Icon loading name='circle notched' />
                  }
                  {!isScrolling &&
                    <SemanticList.Content>
                      <SemanticList.Header>
                        <Link href={`/history/${record.code}`} passHref>
                          <a>{`Created at ${formatDate(record.createdAt)}`}</a>
                        </Link>
                      </SemanticList.Header>
                      {record.validAt &&
                        <SemanticList.Description>
                          {`Valid from ${formatDate(record.validAt)}`}
                        </SemanticList.Description>
                      }
                      {record.expiredAt &&
                        <SemanticList.Description>
                          {`Expired at ${formatDate(record.expiredAt)}`}
                        </SemanticList.Description>
                      }
                    </SemanticList.Content>
                  }
                </SemanticList.Item>
              )
            }}
          />
        }
      </AutoSizer>
    )
  }
}
