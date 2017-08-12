import React from 'react'
import { AutoSizer, List } from 'react-virtualized'
import { List as SemanticList, Icon } from 'semantic-ui-react'
import Link from 'next/link'
import moment from 'moment'

const formatDate = unix => moment.unix(unix).format('MMMM DD, YYYY h:mm A')

export default props => (
  <AutoSizer>
    {({ height, width }) =>
      <List
        autoHeight
        height={height}
        rowCount={props.histories.length}
        rowRenderer={({ key, index, style, isScrolling }) => {
          const record = props.histories[index]
          return (
            <SemanticList.Item key={key} style={style}>
              {isScrolling &&
                <Icon loading name='circle notched' />
              }
              {!isScrolling &&
                <SemanticList.Content>
                  <SemanticList.Header>
                    <Link href={`/history/${record.code}`}>
                      {`Created at ${formatDate(record.createdAt)}`}
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
