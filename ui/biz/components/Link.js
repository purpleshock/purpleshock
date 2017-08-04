import React, { PureComponent } from 'react'
import NextLink from 'next/link'

export default class Link extends PureComponent {
  render () {
    const { href, children, ...rest } = this.props
    return (
      <NextLink href={href}>
        <a {...rest}>{children}</a>
      </NextLink>
    )
  }
}
