import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Menu, Button } from 'semantic-ui-react'
import Link from 'next/link'
import window from 'global/window'
import { parse, format } from 'querystring'

export default class Pagination extends PureComponent {
  static propTypes = {
    query: PropTypes.object,
    page: PropTypes.number.isRequired,
    totalPages: PropTypes.number.isRequired,
    pagination: PropTypes.number.isRequired
  }

  constructor (props) {
    super(props)
    this.state = {
      pages: this.calcCurrentPages(props)
    }
  }

  componentWillReceiveProps (nextProps) {
    const { pagination, totalPages, page } = this.props
    if (nextProps.pagination !== pagination ||
      nextProps.totalPages !== totalPages ||
      nextProps.page !== page) {
      this.setState(prevState => {
        return {
          pages: this.calcCurrentPages(nextProps)
        }
      })
    }
  }


  calcCurrentPages (props) {
    const { pagination, totalPages, page } = props
    const halfPagination = Math.floor(pagination / 2) - 1

    let minPage = page - halfPagination
    minPage = Math.max(minPage, 1)

    let maxPage = minPage + pagination - 1
    if (maxPage > totalPages) {
      maxPage = totalPages
      minPage = Math.max(maxPage - pagination + 1, 1)
    }

    const pages = []
    do {
      pages[pages.length] = minPage++
    } while (minPage !== maxPage)

    return pages
  }

  render () {
    const { page, totalPages } = this.props
    const { pages } = this.state
    const query = parse(window.location.search.slice(1))
    const disabledPrev = pages[0] == 1
    const disabledNext = pages[pages.length] == totalPages

    return (
      <Menu pagination>
        <Button icon='angle left' disabled={disabledPrev}>
          {!disabledPrev &&
            <Link
              href={{
                pathname: window.location.pathname,
                query: {
                  ...query,
                  page: pages[0] - 1
                }
              }}
            />
          }
        </Button>
        {pages.map(iter =>
          <Menu.Item active={page == iter}>
            <Link
              href={{
                pathname: window.location.pathname,
                query: {
                  ...query,
                  page: iter
                }
              }}
            />
          </Menu.Item>
        )}
        <Button icon='angle right' disabled={disabledNext}>
          {!disabledNext &&
            <Link
              href={{
                pathname: window.location.pathname,
                query: {
                  ...query,
                  page: pages[pages.length] + 1
                }
              }}
            />
          }
        </Button>
      </Menu>
    )
  }
}
