import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import Router from 'next/router'

export default class StyleableLink extends PureComponent {
  static propTypes = {
    className: PropTypes.string,
    href: PropTypes.any,
    children: PropTypes.node
  }

  render () {
    const { className, href, children, ...otherProps } = this.props
    return (
      <a
        className={className}
        href={href}
        onClick={this.onClick}
        {...otherProps}>
        {children}
      </a>
    )
  }

  onClick = e => {
    e.preventDefault()
    Router.push(this.props.href)
  }
}
